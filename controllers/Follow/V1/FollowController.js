const followModel = require("../../../models/Follow");
const userModel = require("../../../models/User");
const {
  FollowUser,
  UnfollowUser,
  FollowingList,
  FollowersList,
} = require("../../../services/Follow/FollowService");

/**
 * @swagger
 * /Api/v1/follow/followUser:
 *   post:
 *     summary: Seguir a un usuario
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followed
 *             properties:
 *               followed:
 *                 type: string
 *                 description: ID del usuario al que se quiere seguir
 *                 example: 64a1efbce5b4f20012d34a23
 *     responses:
 *       200:
 *         description: Usuario seguido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Ahora sigues a este usuario
 *                 followSaved:
 *                   $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Error de validación o parámetros incorrectos
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */
const Follow = async (req, res) => {
  const params = req.body;
  const userLoggedId = req.user.id;
  let followSaved;

  try {
    followSaved = await FollowUser(params, userLoggedId);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "Ahora sigues a este usuario",
    followSaved,
  });
};

const Unfollow = async (req, res) => {
  const followedId = req.params.id;
  const userLoggedId = req.user.id;

  try {
    await UnfollowUser(followedId, userLoggedId);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "Ya no sigues a este usuario",
  });
};

const Following = async (req, res) => {
  let followingList, followingListLoggedUser, followersListLoggedUser;

  try {
    [followingList, followingListLoggedUser, followersListLoggedUser] =
      await FollowingList(req.params, req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }
  res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "Listado de usuarios a los que sigues",
    following: {
      page: followingList.page,
      pageSize: followingList.limit,
      totalUsers: followingList.totalDocs,
      totalPages: followingList.totalPages,
      following: followingList.docs,
    },
    followingLoggedUser: followingListLoggedUser,
    followersLoggedUser: followersListLoggedUser,
  });
};

const Followers = async (req, res) => {
  let followersList, followingListLoggedUser, followersListLoggedUser;

  try {
    [followersList, followingListLoggedUser, followersListLoggedUser] =
      await FollowersList(req.params, req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }
  res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "Listado de usuarios que te sigen",
    followers: {
      page: followersList.page,
      pageSize: followersList.limit,
      totalUsers: followersList.totalDocs,
      totalPages: followersList.totalPages,
      followers: followersList.docs,
    },
    followingLoggedUser: followingListLoggedUser,
    followersLoggedUser: followersListLoggedUser,
  });
};

module.exports = {
  Follow,
  Unfollow,
  Following,
  Followers,
};
