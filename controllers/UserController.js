//importar dependencias
/** @type {import("mongoose").Model} */
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const {
  ValidateBasicInfoUser,
  ValidateUserExists,
  ValidateLoginInfo,
  ValidateLoginCredentials,
} = require("../utilitario/ValidateUser");
const jwt = require("../utilitario/jwt");

const TestUser = (req, res) => {
  res.status(200).send({
    message: "Test user endpoint is working",
  });
};

const SignUpUser = async (req, res) => {
  let params = req.body;
  let passwordEncrypted;
  let user;
  try {
    ValidateBasicInfoUser(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

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
    user: userSaved,
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
    user: {
      nick: userlogged.nick,
      role: userlogged.role,
      email: userlogged.email,
      username: userlogged.username,
    },
    token: token,
  });
};

module.exports = {
  TestUser,
  SignUpUser,
  Login,
};
