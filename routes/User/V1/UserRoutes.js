const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../../../controllers/User/V1/UserController");
const { authenticate } = require("../../../middlewares/auth");

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
router.post("/signup", UserController.SignUpUser);
router.post("/login", UserController.Login);
router.get("/profile/:id", authenticate, UserController.GetUserProfile);
router.get("/list{/:page}", authenticate, UserController.GetUsers);
router.put("/update", authenticate, UserController.UpdateUser);
router.post(
  "/updateImage",
  [authenticate, upload.single("image")],
  UserController.UploadImage
);
router.get("/avatar", authenticate, UserController.Avatar);
router.get("/counters/:id", authenticate, UserController.Counters);

// Exportar el router
module.exports = router;
