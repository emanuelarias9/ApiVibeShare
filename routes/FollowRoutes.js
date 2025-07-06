const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/FollowController");

//Definir rutas
router.get("TestFollow", FollowController.TestFollow);

// Exportar el router
module.exports = router;
