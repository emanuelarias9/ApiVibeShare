const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");

//Definir rutas
router.get("TestUser", UserController.TestUser);
router.post("/signup", UserController.SignUpUser);

// Exportar el router
module.exports = router;
