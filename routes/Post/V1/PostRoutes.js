const express = require("express");
const router = express.Router();
const PostController = require("../../../controllers/Post/V1/PostController");
const { authenticate } = require("../../../middlewares/auth");

//Definir rutas
router.post("/save", authenticate, PostController.Save);
router.get("/detail/:id", authenticate, PostController.Detail);
router.delete("/delete/:id", authenticate, PostController.Delete);
router.get("/userPosts/:id{/:page}", authenticate, PostController.UserPosts);
// Exportar el router
module.exports = router;
