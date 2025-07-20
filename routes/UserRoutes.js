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
router.get("/profile/:userId", authenticate, UserController.GetUserProfile);
router.get("/list{/:page}", authenticate, UserController.GetUsers);
router.put("/update", authenticate, UserController.UpdateUser);
router.post(
  "/updateImage",
  [authenticate, upload.single("image")],
  UserController.UploadImage
);
router.get("/avatar", authenticate, UserController.avatar);
// Exportar el router
module.exports = router;
