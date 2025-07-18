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
router.post("/signup", UserController.SignUpUser);
router.post("/login", UserController.Login);
router.get("/profile/:userId", authenticate, UserController.GetUserProfile);
router.get("/list{/:page}", authenticate, UserController.GetUsers);
router.put("/update", authenticate, UserController.UpdateUser);
router.post(
  "/updateImage",
  [authenticate, upload.single("image")],
  UserController.UploadImage
);

// Exportar el router
module.exports = router;
