const express = require("express");
const router = express.Router();
const PostController = require("../../../controllers/Post/V1/PostController");
const { authenticate } = require("../../../middlewares/auth");
const multer = require("multer");

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/posts/");
  },
  filename: (req, file, cb) => {
    cb(null, `Post-${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//Definir rutas
router.post("/save", authenticate, PostController.Save);
router.get("/detail/:id", authenticate, PostController.Detail);
router.delete("/delete/:id", authenticate, PostController.Delete);
router.get("/userPosts/:id{/:page}", authenticate, PostController.UserPosts);
router.post(
  "/uploadImage/:id",
  [authenticate, upload.single("file")],
  PostController.UploadImage
);
router.get("/postImage/:id", authenticate, PostController.PostImage);
router.get("/feed{/:page}", authenticate, PostController.Feed);
// Exportar el router
module.exports = router;
