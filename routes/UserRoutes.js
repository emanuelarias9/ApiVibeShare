const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
const { authenticate } = require("../middlewares/auth");

//Definir rutas
router.get("/TestUser", authenticate, UserController.TestUser);
router.post("/signup", UserController.SignUpUser);
router.post("/login", UserController.Login);
router.get("/Profile/:userId", authenticate, UserController.GetUserProfile);

// Exportar el router
module.exports = router;
