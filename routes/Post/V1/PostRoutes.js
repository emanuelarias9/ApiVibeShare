const express = require("express");
const router = express.Router();
const PostController = require("../../../controllers/Post/V1/PostController");

//Definir rutas
router.get("TestPost", PostController.TestPost);

// Exportar el router
module.exports = router;
