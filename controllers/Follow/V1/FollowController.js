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
 *     summary: Follow a user
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
 *                 description: ID of the user you want to follow
 *                 example: 64a1efbce5b4f20012d34a23
 *     responses:
 *       200:
 *         description: User followed successfully
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
 *                   example: You are now following this user
 *                 followSaved:
 *                   $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Invalid data in the request
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
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
    message: "You are now following this user",
    followSaved,
  });
};

/**
 * @swagger
 * /Api/v1/follow/unfollowUser/{id}:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be unfollowed
 *         schema:
 *           type: string
 *           example: 64a1efbce5b4f20012d34a23
 *     responses:
 *       200:
 *         description: User successfully unfollowed
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
 *                   example: You no longer follow this user
 *       400:
 *         description: Invalid data in the request
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: You don't follow this user.
 *       500:
 *         description: Internal Server Error
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
    message: "You no longer follow this user",
  });
};

/**
 * @swagger
 * /Api/v1/follow/following/{page}/{id}:
 *   get:
 *     summary: Get the list of users that a user is following
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: false
 *         description: Page number for pagination (default 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id
 *         required: false
 *         description: ID of the user whose following you want to see (if omitted, the logged-in user is used)
 *         schema:
 *           type: string
 *           example: 688276fcf3c903785f5de454
 *     responses:
 *       200:
 *         description: List of followed users
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
 *                   example: List of users you follow
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
 *                             description: ID of the user you are following
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
 *                   description: List of IDs that the logged in user follows
 *                   items:
 *                     type: string
 *                     example: 68826f5db2dcc94a75398a84
 *                 followersLoggedUser:
 *                   type: array
 *                   description: List of IDs that follow the logged in user
 *                   items:
 *                     type: string
 *                     example: 688276fcf3c903785f5de454
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
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
    message: "List of users you follow",
    following: {
      page: followingList.page,
      pageSize: followingList.limit,
      totalUsers: followingList.totalDocs,
      totalPages: followingList.totalPages,
      hasPrevPage: followingList.hasPrevPage,
      hasNextPage: followingList.hasNextPage,
      prevPage: followingList.prevPage,
      nextPage: followingList.nextPage,
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
 *     summary: Get the list of users who follow a user
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         required: false
 *         description: Page number for pagination (default 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id
 *         required: false
 *         description: ID of the user whose followers you want to see (if omitted, the logged-in user is used)
 *         schema:
 *           type: string
 *           example: 64a1ef98e5b4f20012d349fe
 *     responses:
 *       200:
 *         description: List of users following the user
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
 *                   example: List of users who follow you
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
 *                             description: ID of the user being followed (the logged-in user or the one specified in the path)
 *                             example: 68788e3cf8d7114cece523ab
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-07-25T04:08:13.400Z
 *                 followingLoggedUser:
 *                   type: array
 *                   description: List of IDs that the logged in user follows
 *                   items:
 *                     type: string
 *                     example: 64a1efbce5b4f20012d34a23
 *                 followersLoggedUser:
 *                   type: array
 *                   description: List of IDs that follow the logged in user
 *                   items:
 *                     type: string
 *                     example: 64a1ef98e5b4f20012d349fe
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
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
    message: "List of users who follow you",
    followers: {
      page: followersList.page,
      pageSize: followersList.limit,
      totalUsers: followersList.totalDocs,
      totalPages: followersList.totalPages,
      hasPrevPage: followersList.hasPrevPage,
      hasNextPage: followersList.hasNextPage,
      prevPage: followersList.prevPage,
      nextPage: followersList.nextPage,
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
