const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
const { authenticate } = require("../middlewares/auth");

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/users/avatars/");
  },
  filename: (req, file, cb) => {
    cb(null, `Avatar-${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//Definir rutas
router.get("/testUser", authenticate, UserController.TestUser);
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Usuario ya existe
 */
router.post("/signup", UserController.SignUpUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Users
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", UserController.Login);

/**
 * @swagger
 * /user/profile/{userId}:
 *   get:
 *     summary: Obtener perfil del usuario
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/profile/:userId", authenticate, UserController.GetUserProfile);

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Listar usuarios paginados
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de usuarios paginada
 */
router.get("/list{/:page}", authenticate, UserController.GetUsers);

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Actualizar perfil del usuario
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
 *               nick:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.put("/update", authenticate, UserController.UpdateUser);

/**
 * @swagger
 * /user/updateImage:
 *   post:
 *     summary: Subir o actualizar imagen de perfil del usuario
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 */
router.post(
  "/updateImage",
  [authenticate, upload.single("image")],
  UserController.UploadImage
);

/**
 * @swagger
 * /user/avatar:
 *   get:
 *     summary: Obtener imagen de perfil del usuario autenticado
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Imagen de perfil devuelta correctamente
 *       404:
 *         description: Imagen no encontrada
 */
router.get("/avatar", authenticate, UserController.avatar);

// Exportar el router
module.exports = router;
