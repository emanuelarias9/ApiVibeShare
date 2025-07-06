const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

//Definir rutas
router.get("TestUser", UserController.TestUser);

// Exportar el router
module.exports = router;
