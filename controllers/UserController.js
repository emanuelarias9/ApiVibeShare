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

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - nick
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "emanuelarias"
 *               nick:
 *                 type: string
 *                 example: "EmaDev"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ema@correo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *               bio:
 *                 type: string
 *                 example: "Desarrollador full-stack"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Created
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Usuario emanuelarias registrado correctamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */

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

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Users
 *     description: Valida las credenciales del usuario y devuelve un token JWT si el inicio de sesión es exitoso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ema@correo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login exitoso. Devuelve un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Parámetros de entrada inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
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

/**
 * @swagger
 * /api/user/profile/{id}:
 *   get:
 *     summary: Obtener el perfil de un usuario por ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token no válido o no enviado
 */

const GetUserProfile = async (req, res) => {
  let userId = req.params.id;
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

/**
 * @swagger
 * /api/user/list/{page}:
 *   get:
 *     summary: Obtener listado paginado de usuarios
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (opcional, por defecto 1)
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 5
 *                 totalUsers:
 *                   type: integer
 *                   example: 24
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       500:
 *         description: Error al obtener usuarios
 */

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

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Actualizar datos del usuario autenticado
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevoUsername"
 *               nick:
 *                 type: string
 *                 example: "NuevoNick"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "nuevo@email.com"
 *               bio:
 *                 type: string
 *                 example: "Descripción actualizada"
 *               updatedAt:
 *                 type: integer
 *                 example: 1752729792507
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 infoUpdate:
 *                   type: object
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El usuario o email ya están registrados
 *       401:
 *         description: No autorizado. Token no válido o no enviado
 *       500:
 *         description: Error interno al actualizar el usuario
 */

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
  GetUsers,
  SignUpUser,
  GetUserProfile,
  UpdateUser,
  UploadImage,
  avatar,
};
