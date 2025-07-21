const express = require("express");
const router = express.Router();
const FollowController = require("../../../controllers/Follow/V1/FollowController");
const { authenticate } = require("../../../middlewares/auth");

//Definir rutas
router.get("TestFollow", FollowController.TestFollow);
router.post("follow", FollowController.Follow);

// Exportar el router
module.exports = router;
