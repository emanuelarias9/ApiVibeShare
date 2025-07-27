const express = require("express");
const router = express.Router();
const FollowController = require("../../../controllers/Follow/V1/FollowController");
const { authenticate } = require("../../../middlewares/auth");

//Definir rutas
router.post("/followUser", authenticate, FollowController.Follow);
router.delete("/unfollowUser/:id", authenticate, FollowController.Unfollow);
router.get(
  "/following{/:page}{/:id}",
  authenticate,
  FollowController.Following
);
router.get(
  "/followers{/:page}{/:id}",
  authenticate,
  FollowController.Followers
);
// Exportar el router
module.exports = router;
