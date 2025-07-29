const followModel = require("../../../models/Follow");
const userModel = require("../../../models/User");
const CleanBody = require("../../../utilitario/CleanBody");
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

/**
 * @swagger
 * /Api/v1/follow/unfollowUser/{id}:
 *   delete:
 *     summary: Dejar de seguir a un usuario
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario al que se dejará de seguir
 *         schema:
 *           type: string
 *           example: 64a1efbce5b4f20012d34a23
 *     responses:
 *       200:
 *         description: Usuario dejado de seguir con éxito
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
 *                   example: Ya no sigues a este usuario
 *       400:
 *         description: Error de validación o parámetros incorrectos
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       404:
 *         description: El seguimiento no existe
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /Api/v1/follow/following/{page}/{id}:
 *   get:
 *     summary: Obtener la lista de usuarios que un usuario está siguiendo
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: false
 *         description: Número de página para paginación (por defecto 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id
 *         required: false
 *         description: ID del usuario del que se quieren ver los seguidos (si se omite, se usa el usuario logueado)
 *         schema:
 *           type: string
 *           example: 688276fcf3c903785f5de454
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos
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
 *                   example: Listado de usuarios a los que sigues
 *                 following:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 5
 *                     totalUsers:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     following:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID del usuario que sigue
 *                             example: 688276fcf3c903785f5de454
 *                           followed:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 68788e3cf8d7114cece523ab
 *                               username:
 *                                 type: string
 *                                 example: emanuelariasjoiro
 *                               nick:
 *                                 type: string
 *                                 example: Canserbero
 *                               email:
 *                                 type: string
 *                                 format: email
 *                                 example: emanuelarias9@correo.com
 *                               image:
 *                                 type: string
 *                                 example: Avatar-1752892768732-will.jpg
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-07-25T04:08:13.400Z
 *                 followingLoggedUser:
 *                   type: array
 *                   description: Lista de IDs que el usuario logueado sigue
 *                   items:
 *                     type: string
 *                     example: 68826f5db2dcc94a75398a84
 *                 followersLoggedUser:
 *                   type: array
 *                   description: Lista de IDs que siguen al usuario logueado
 *                   items:
 *                     type: string
 *                     example: 688276fcf3c903785f5de454
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */

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

/**
 * @swagger
 * /Api/v1/follow/followers/{page}/{id}:
 *   get:
 *     summary: Obtener la lista de usuarios que siguen a un usuario
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: false
 *         description: Número de página para paginación (por defecto 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id
 *         required: false
 *         description: ID del usuario del que se quieren ver los seguidores (si se omite, se usa el usuario logueado)
 *         schema:
 *           type: string
 *           example: 64a1ef98e5b4f20012d349fe
 *     responses:
 *       200:
 *         description: Lista de usuarios que siguen al usuario
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
 *                   example: Listado de usuarios que te siguen
 *                 followers:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalUsers:
 *                       type: integer
 *                       example: 37
 *                     totalPages:
 *                       type: integer
 *                       example: 4
 *                     followers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 688276fcf3c903785f5de454
 *                               username:
 *                                 type: string
 *                                 example: rsmissen2
 *                               nick:
 *                                 type: string
 *                                 example: Remus
 *                               email:
 *                                 type: string
 *                                 format: email
 *                                 example: testuser@correo.com
 *                               image:
 *                                 type: string
 *                                 example: default.png
 *                           followed:
 *                             type: string
 *                             description: ID del usuario que está siendo seguido (el usuario logueado o el especificado en la ruta)
 *                             example: 68788e3cf8d7114cece523ab
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-07-25T04:08:13.400Z
 *                 followingLoggedUser:
 *                   type: array
 *                   description: Lista de IDs que el usuario logueado sigue
 *                   items:
 *                     type: string
 *                     example: 64a1efbce5b4f20012d34a23
 *                 followersLoggedUser:
 *                   type: array
 *                   description: Lista de IDs que siguen al usuario logueado
 *                   items:
 *                     type: string
 *                     example: 64a1ef98e5b4f20012d349fe
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */
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
