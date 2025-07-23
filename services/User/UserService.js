const fs = require("fs");
const validator = require("validator");
const userModel = require("../../models/User");
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

const ValidateBasicInfoUser = (params) => {
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  if (
    !params.username ||
    validator.isEmpty(params.username, { ignore_whitespace: true })
  ) {
    throw new BadRequest("El nombre de usuario es obligatorio");
  }
  if (
    !params.nick ||
    validator.isEmpty(params.nick, { ignore_whitespace: true })
  ) {
    throw new BadRequest("El nick es obligatorio");
  }
  if (
    !params.email ||
    validator.isEmpty(params.email, { ignore_whitespace: true })
  ) {
    throw new BadRequest("El email es obligatorio");
  }
  if (!validator.isEmail(params.email)) {
    throw new BadRequest("El email no es válido");
  }
  if (
    !params.password ||
    validator.isEmpty(params.password, { ignore_whitespace: true })
  ) {
    throw new BadRequest("La contraseña es obligatoria");
  }
  if (params.password.length < 8) {
    throw new BadRequest("La contraseña debe tener al menos 8 caracteres");
  }
};

const ValidateUserExists = async (params) => {
  let email;
  let username;
  if (params.email) {
    email = params.email.toLowerCase();
  }

  if (params.username) {
    username = params.username.toLowerCase();
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
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  if (
    !params.email ||
    validator.isEmpty(params.email, { ignore_whitespace: true })
  ) {
    throw new BadRequest("No has ingresado el email");
  }
  if (!validator.isEmail(params.email)) {
    throw new BadRequest("El email no es válido");
  }
  if (
    !params.password ||
    validator.isEmpty(params.password, { ignore_whitespace: true })
  ) {
    throw new BadRequest("No has ingresado la contraseña");
  }
};

const ValidateLoginCredentials = async (params) => {
  const email = params.email.toLowerCase();
  const user = await userModel.findOne({ email }).exec();

  if (!user) {
    throw new NotFound("El usuario no existe");
  }

  let password = bcrypt.compareSync(params.password, user.password);
  if (password === false) {
    throw new Unauthorized("La contraseña es incorrecta");
  }

  return user;
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

module.exports = {
  ValidateBasicInfoUser,
  ValidateUserExists,
  ValidateLoginInfo,
  ValidateLoginCredentials,
  GetUserById,
  GetAllUsers,
  UpdateUserInfo,
  UpdateUserImage,
  GetUserAvatar,
};
