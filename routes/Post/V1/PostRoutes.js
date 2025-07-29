const express = require("express");
const router = express.Router();
const PostController = require("../../../controllers/Post/V1/PostController");
const { authenticate } = require("../../../middlewares/auth");

//Definir rutas
router.get("TestPost", PostController.TestPost);
router.post("/save", authenticate, PostController.Save);
router.get("/detail/:id", authenticate, PostController.Detail);

// Exportar el router
module.exports = router;
