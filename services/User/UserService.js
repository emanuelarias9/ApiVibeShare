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
    throw new BadRequest("Parameters are required");
  }
  cleanParams = CleanBody(params);
  if (
    !cleanParams.username ||
    validator.isEmpty(cleanParams.username, { ignore_whitespace: true })
  ) {
    throw new BadRequest("Username is required");
  }
  if (
    !cleanParams.nick ||
    validator.isEmpty(cleanParams.nick, { ignore_whitespace: true })
  ) {
    throw new BadRequest("The nickname is required");
  }
  if (
    !cleanParams.email ||
    validator.isEmpty(cleanParams.email, { ignore_whitespace: true })
  ) {
    throw new BadRequest("Email is required");
  }
  if (!validator.isEmail(cleanParams.email)) {
    throw new BadRequest("The email is invalid");
  }
  if (
    !cleanParams.password ||
    validator.isEmpty(cleanParams.password, { ignore_whitespace: true })
  ) {
    throw new BadRequest("Password is required");
  }
  if (cleanParams.password.length < 8) {
    throw new BadRequest("The password must be at least 8 characters long.");
  }
};

const ValidateUserExists = async (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Parameters are required");
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
    throw new Conflict(`The email ${email} is already registered`);
  }

  if (userExists && userExists.username === username) {
    throw new Conflict(`The username ${username} is already registered`);
  }
};

const ValidateLoginInfo = (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Parameters are required");
  }
  cleanParams = CleanBody(params);
  if (
    !cleanParams.email ||
    validator.isEmpty(cleanParams.email, { ignore_whitespace: true })
  ) {
    throw new BadRequest("You have not entered the email");
  }
  if (!validator.isEmail(cleanParams.email)) {
    throw new BadRequest("Invalid Email");
  }
  if (
    !cleanParams.password ||
    validator.isEmpty(cleanParams.password, { ignore_whitespace: true })
  ) {
    throw new BadRequest("You have not entered the password");
  }
};

const ValidateLoginCredentials = async (params) => {
  let cleanParams;
  if (!params) {
    throw new BadRequest("Parameters are required");
  }
  cleanParams = CleanBody(params);
  const email = cleanParams.email.toLowerCase();
  const user = await userModel.findOne({ email }).exec();

  if (!user) {
    throw new NotFound("The user does not exist");
  }

  let password = bcrypt.compareSync(cleanParams.password, user.password);
  if (password === false) {
    throw new Unauthorized("Wrong password");
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
    throw new BadRequest("Invalid user ID");
  }
  const user = await userModel
    .findById(userId)
    .select({ password: 0, role: 0 })
    .exec();
  if (!user) {
    throw new NotFound("User not found");
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
    throw new InternalServerError("Error getting users");
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
    throw new BadRequest("Invalid user ID");
  }

  if (infoUpdate.password) {
    passwordEncrypted = await bcrypt.hash(infoUpdate.password, 10);
    infoUpdate.password = passwordEncrypted;
  }

  if (infoUpdate.email) {
    infoUpdate.email = infoUpdate.email.toLowerCase();
    if (!validator.isEmail(infoUpdate.email.trim())) {
      throw new BadRequest("The email is invalid");
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
    throw new NotFound("User not found to update");
  }
};

const UpdateUserImage = async (userId, file) => {
  let userImageUpdated;

  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("Invalid user ID");
  }

  userImageUpdated = await userModel
    .findByIdAndUpdate(userId, { image: file.filename }, { new: false })
    .exec();

  if (!userImageUpdated) {
    throw new NotFound("User not found to update");
  }

  DeleteImage(userImageUpdated.image);
};

const GetUserAvatar = async (userId) => {
  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("Invalid user ID");
  }

  const user = await userModel.findById(userId).exec();

  if (!user) {
    throw new NotFound("User not found");
  }

  let filepath = path.resolve(`./uploads/users/avatars/${user.image}`);

  return filepath;
};
const GetCounters = async (userId) => {
  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("Invalid user ID");
  }

  const exists = ValidateIdExist(userId);
  if (!exists) {
    throw new NotFound("User not found");
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
