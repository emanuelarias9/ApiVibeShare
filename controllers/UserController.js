//importar dependencias
/** @type {import("mongoose").Model} */
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const {
  ValidateBasicInfoUser,
  ValidateUserExists,
  ValidateLoginInfo,
  ValidateLoginCredentials,
  GetUserById,
  GetAllUsers,
  UpdateUserInfo,
  UpdateUserImage,
  GetUserAvatar,
} = require("../services/UserService");
const jwt = require("../utilitario/jwt");
const CleanBody = require("../utilitario/CleanBody");
const { ValidateImage } = require("../utilitario/ValidateImage");

const TestUser = (req, res) => {
  res.status(200).send({
    message: "Test user endpoint is working",
    user: req.user,
  });
};

const SignUpUser = async (req, res) => {
  let params = req.body;
  let passwordEncrypted;
  let user;
  let userSaved;
  try {
    ValidateBasicInfoUser(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  params.email = params.email.toLowerCase();
  params.username = params.username.toLowerCase();
  try {
    await ValidateUserExists(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  passwordEncrypted = await bcrypt.hash(params.password, 10);
  params.password = passwordEncrypted;

  user = new userModel(params);

  userSaved = await user.save();
  if (!userSaved) {
    return res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      message: "Error al registrar el usuario",
    });
  }

  return res.status(201).json({
    status: "Created",
    statusCode: 201,
    message: `Usuario ${userSaved.username} registrado correctamente`,
  });
};

const Login = async (req, res) => {
  let params = req.body;
  let userlogged;
  let token;

  try {
    ValidateLoginInfo(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    userlogged = await ValidateLoginCredentials(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  token = jwt.createToken(userlogged);

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "Login successful",
    token: token,
  });
};

const GetUserProfile = async (req, res) => {
  let userId = req.params.userId;
  let user;
  try {
    user = await GetUserById(userId);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    user: user,
  });
};

const GetUsers = async (req, res) => {
  let page = parseInt(req.params.page || 1);
  let pageSize = 5;
  let users;
  try {
    users = await GetAllUsers(page, pageSize);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    page: users.page,
    pageSize: users.limit,
    totalUsers: users.totalDocs,
    totalPages: users.totalPages,
    users: users.docs,
  });
};

const UpdateUser = async (req, res) => {
  let user = req.user;
  let infoUpdate = CleanBody(req.body);
  let updatedUser;

  try {
    await ValidateUserExists(infoUpdate);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    updatedUser = await UpdateUserInfo(user.id, infoUpdate);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    updatedUser: updatedUser,
    message: "User updated successfully",
    infoUpdate: infoUpdate,
  });
};

const UploadImage = (req, res) => {
  let file = req.file;

  try {
    ValidateImage(file);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    UpdateUserImage(req.user.id, file);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "File uploaded successfully",
    file: file.filename,
  });
};

const avatar = async (req, res) => {
  let avatar;
  try {
    avatar = await GetUserAvatar(req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.sendFile(avatar); // Send the image file directly
};

module.exports = {
  Login,
  TestUser,
  GetUsers,
  SignUpUser,
  GetUserProfile,
  UpdateUser,
  UploadImage,
  avatar,
};
