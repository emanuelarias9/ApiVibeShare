const fs = require("fs");
const validator = require("validator");
const userModel = require("../../models/User");
const followModel = require("../../models/Follow");
const postModel = require("../../models/Post");
const path = require("path");
const {
  BadRequest,
  Conflict,
  NotFound,
  Unauthorized,
  InternalServerError,
} = require("../../utilitario/HttpErrors");
const bcrypt = require("bcrypt");
const { DeleteImage } = require("../../utilitario/ValidateImage");
const CleanBody = require("../../utilitario/CleanBody");

const ValidateBasicInfoUser = (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  cleanParams = CleanBody(params);
  if (
    !cleanParams.username ||
    validator.isEmpty(cleanParams.username, { ignore_whitespace: true })
  ) {
    throw new BadRequest("El nombre de usuario es obligatorio");
  }
  if (
    !cleanParams.nick ||
    validator.isEmpty(cleanParams.nick, { ignore_whitespace: true })
  ) {
    throw new BadRequest("El nick es obligatorio");
  }
  if (
    !cleanParams.email ||
    validator.isEmpty(cleanParams.email, { ignore_whitespace: true })
  ) {
    throw new BadRequest("El email es obligatorio");
  }
  if (!validator.isEmail(cleanParams.email)) {
    throw new BadRequest("El email no es válido");
  }
  if (
    !cleanParams.password ||
    validator.isEmpty(cleanParams.password, { ignore_whitespace: true })
  ) {
    throw new BadRequest("La contraseña es obligatoria");
  }
  if (cleanParams.password.length < 8) {
    throw new BadRequest("La contraseña debe tener al menos 8 caracteres");
  }
};

const ValidateUserExists = async (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  cleanParams = CleanBody(params);
  let email;
  let username;
  if (cleanParams.email) {
    email = cleanParams.email.toLowerCase();
  }

  if (cleanParams.username) {
    username = cleanParams.username.toLowerCase();
  }

  const userExists = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .exec();

  if (userExists && userExists.email === email) {
    throw new Conflict(`El email ${email} ya está registrado`);
  }

  if (userExists && userExists.username === username) {
    throw new Conflict(`El nombre de usuario ${username} ya está registrado`);
  }
};

const ValidateLoginInfo = (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  cleanParams = CleanBody(params);
  if (
    !cleanParams.email ||
    validator.isEmpty(cleanParams.email, { ignore_whitespace: true })
  ) {
    throw new BadRequest("No has ingresado el email");
  }
  if (!validator.isEmail(cleanParams.email)) {
    throw new BadRequest("El email no es válido");
  }
  if (
    !cleanParams.password ||
    validator.isEmpty(cleanParams.password, { ignore_whitespace: true })
  ) {
    throw new BadRequest("No has ingresado la contraseña");
  }
};

const ValidateLoginCredentials = async (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  cleanParams = CleanBody(params);
  const email = cleanParams.email.toLowerCase();
  const user = await userModel.findOne({ email }).exec();

  if (!user) {
    throw new NotFound("El usuario no existe");
  }

  let password = bcrypt.compareSync(cleanParams.password, user.password);
  if (password === false) {
    throw new Unauthorized("La contraseña es incorrecta");
  }

  return user;
};

const ValidateIdExist = async (id) => {
  const count = await userModel.countDocuments({ _id: id });
  const exist = count > 0;
  return exist;
};

const GetUserById = async (userId) => {
  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }
  const user = await userModel
    .findById(userId)
    .select({ password: 0, role: 0 })
    .exec();
  if (!user) {
    throw new NotFound("Usuario no encontrado");
  }
  return user;
};

const GetAllUsers = async (page, pageSize) => {
  const options = {
    page,
    limit: pageSize,
    sort: { _id: 1 },
  };

  // @ts-ignore
  let result = await userModel.paginate({}, options);

  if (!result) {
    throw new InternalServerError("Error al obtener los usuarios");
  }

  return result;
};

const UpdateUserInfo = async (userId, infoUpdate) => {
  let updatedUser;
  let passwordEncrypted;
  delete infoUpdate.iat;
  delete infoUpdate.exp;
  delete infoUpdate.role;
  delete infoUpdate.image;

  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  if (infoUpdate.password) {
    passwordEncrypted = await bcrypt.hash(infoUpdate.password, 10);
    infoUpdate.password = passwordEncrypted;
  }

  if (infoUpdate.email) {
    infoUpdate.email = infoUpdate.email.toLowerCase();
    if (!validator.isEmail(infoUpdate.email.trim())) {
      throw new BadRequest("El email no es válido");
    }
  }

  if (infoUpdate.username) {
    infoUpdate.username = infoUpdate.username.toLowerCase();
  }

  infoUpdate.updatedAt = Date.now();

  updatedUser = await userModel
    .findByIdAndUpdate(userId, infoUpdate, { new: true })
    .exec();

  if (!updatedUser) {
    throw new NotFound("Usuario no encontrado para actualizar");
  }
};

const UpdateUserImage = async (userId, file) => {
  let userImageUpdated;

  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  userImageUpdated = await userModel
    .findByIdAndUpdate(userId, { image: file.filename }, { new: false })
    .exec();

  if (!userImageUpdated) {
    throw new NotFound("Usuario no encontrado para actualizar");
  }

  DeleteImage(userImageUpdated.image);
};

const GetUserAvatar = async (userId) => {
  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  const user = await userModel.findById(userId).exec();

  if (!user) {
    throw new NotFound("Usuario no encontrado");
  }

  let filepath = path.resolve(`./uploads/users/avatars/${user.image}`);

  return filepath;
};
const GetCounters = async (userId) => {
  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  const counters = await Promise.allSettled([
    followModel.countDocuments({ followed: userId }), // followers
    followModel.countDocuments({ user: userId }), // following
    postModel.countDocuments({ user: userId }), // posts
  ]);
  const [followersCount, followingCount, postsCount] = counters;

  const posts = postsCount.status === "fulfilled" ? postsCount.value : 0;

  const followers =
    followersCount.status === "fulfilled" ? followersCount.value : 0;

  const following =
    followingCount.status === "fulfilled" ? followingCount.value : 0;

  return { userId, posts, followers, following };
};
module.exports = {
  ValidateBasicInfoUser,
  ValidateUserExists,
  ValidateLoginInfo,
  ValidateLoginCredentials,
  ValidateIdExist,
  GetUserById,
  GetAllUsers,
  UpdateUserInfo,
  UpdateUserImage,
  GetUserAvatar,
  GetCounters,
};
