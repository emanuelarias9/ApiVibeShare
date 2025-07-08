//importar dependencias
/** @type {import("mongoose").Model} */
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const {
  ValidateBasicInfoUser,
  ValidateUserExists,
} = require("../utilitario/ValidateUser");

const TestUser = (req, res) => {
  res.status(200).send({
    message: "Test user endpoint is working",
  });
};

const SignUpUser = async (req, res) => {
  let params = req.body;

  try {
    ValidateBasicInfoUser(params);
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      statusCode: 400,
      message: error.message,
    });
  }

  try {
    ValidateUserExists(params);
  } catch (error) {
    return res.status(409).json({
      status: "Conflict",
      statusCode: 409,
      message: error.message,
    });
  }

  let passwordEncrypted = await bcrypt.hash(params.password, 10);
  params.password = passwordEncrypted;
  let user = new userModel(params);

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

module.exports = {
  TestUser,
  SignUpUser,
};
