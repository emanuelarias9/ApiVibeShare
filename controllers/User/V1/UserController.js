//importar dependencias
const {
  SignUp,
  ValidateUserExists,
  ValidateLoginInfo,
  ValidateLoginCredentials,
  GetUserById,
  GetAllUsers,
  UpdateUserInfo,
  UpdateUserImage,
  GetUserAvatar,
  GetCounters,
} = require("../../../services/User/UserService");
const jwt = require("../../../utilitario/jwt");
const { ValidateImage } = require("../../../utilitario/ValidateImage");
const {
  FollowUserInfo,
  FollowingListLoggedUser,
  FollowersListLoggedUser,
} = require("../../../services/Follow/FollowService");

/**
 * @swagger
 * /api/v1/user/avatar:
 *   get:
 *     summary: Get the profile picture of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Image returned successfully
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal Server Error
 */
const Avatar = async (req, res) => {
  let avatar;
  try {
    avatar = await GetUserAvatar(req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.sendFile(avatar); // Send the image file directly
};

/**
 * @swagger
 * /api/v1/user/counters/{id}:
 *   get:
 *     summary: Get a user's activity counters (posts, followers, and following)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user from whom you want to obtain the counters
 *         schema:
 *           type: string
 *           example: 68788e3cf8d7114cece523af
 *     responses:
 *       200:
 *         description: Counters obtained correctly
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
 *                 userId:
 *                   type: string
 *                   description: ID of the user to whom the counters belong
 *                   example: 68788e3cf8d7114cece523ab
 *                 posts:
 *                   type: integer
 *                   description: Total number of posts by the user
 *                   example: 11
 *                 followers:
 *                   type: integer
 *                   description: Number of followers
 *                   example: 1
 *                 following:
 *                   type: integer
 *                   description: Number of users following
 *                   example: 7
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
const Counters = async (req, res) => {
  let counters;
  try {
    counters = await GetCounters(req.params.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    userId: counters.userId,
    posts: counters.posts,
    followers: counters.followers,
    following: counters.following,
  });
};

/**
 * @swagger
 * /api/v1/user/profile/{id}:
 *   get:
 *     summary: Get a user's profile by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile obtained successfully
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
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 */
const GetUserProfile = async (req, res) => {
  let userId = req.params.id;
  let user, followInfo;
  try {
    user = await GetUserById(userId);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    followInfo = await FollowUserInfo(userId, req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    logged: req.user.id,
    user: user,
    followIng: followInfo.following,
    follower: followInfo.follower,
  });
};

/**
 * @swagger
 * /api/v1/user/list/{page}:
 *   get:
 *     summary: Get paginated list of users
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (optional, default 1)
 *     responses:
 *       200:
 *         description: User list successfully obtained
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
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 5
 *                 totalUsers:
 *                   type: integer
 *                   example: 24
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
 */
const GetUsers = async (req, res) => {
  let page = parseInt(req.params.page || 1);
  let pageSize = 5;
  let users, followingLoggedUser, followersLoggedUser;
  try {
    users = await GetAllUsers(page, pageSize);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    followingLoggedUser = await FollowingListLoggedUser(req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    followersLoggedUser = await FollowersListLoggedUser(req.user.id);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    page: users.page,
    pageSize: users.limit,
    totalUsers: users.totalDocs,
    totalPages: users.totalPages,
    hasPrevPage: users.hasPrevPage,
    hasNextPage: users.hasNextPage,
    prevPage: users.prevPage,
    nextPage: users.nextPage,
    users: users.docs,
    followingLoggedUser,
    followersLoggedUser,
  });
};

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     description: Validates the user's credentials and returns a JWT token if the login is successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "testuser@correo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
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
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid data in the request
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 */
const Login = async (req, res) => {
  let params = req.body;
  let userlogged;
  let token;

  try {
    ValidateLoginInfo(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    userlogged = await ValidateLoginCredentials(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  token = jwt.createToken(userlogged);

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "Login successful",
    token: token,
    user: { userId: userlogged._id },
  });
};

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - nick
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "emanuelarias"
 *               nick:
 *                 type: string
 *                 example: "EmaDev"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ema@correo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "12345678"
 *               bio:
 *                 type: string
 *                 example: "Developer full-stack"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Created
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: User emanuelarias registered successfully
 *       400:
 *         description: Invalid data in the request
 *       409:
 *         description: The user or email is already registered
 *       500:
 *         description: Internal Server Error
 */
const SignUpUser = async (req, res) => {
  let params = req.body;
  let userSaved;

  try {
    userSaved = await SignUp(params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(201).json({
    status: "Created",
    statusCode: 201,
    message: `User ${userSaved.username} successfully registered`,
  });
};

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: Update authenticated user data
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevoUsername"
 *               nick:
 *                 type: string
 *                 example: "NuevoNick"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "nuevo@email.com"
 *               bio:
 *                 type: string
 *                 example: "Descripción actualizada"
 *               updatedAt:
 *                 type: integer
 *                 example: 1752729792507
 *     responses:
 *       200:
 *         description: Successfully updated user
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
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 infoUpdate:
 *                   type: object
 *       400:
 *         description: Invalid data in the request
 *       409:
 *         description: The user or email is already registered
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
 */
const UpdateUser = async (req, res) => {
  let user = req.user;
  let infoUpdate = req.body;
  let updatedUser;

  try {
    await ValidateUserExists(infoUpdate);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    updatedUser = await UpdateUserInfo(user.id, infoUpdate);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    updatedUser: updatedUser,
    message: "User updated successfully",
    infoUpdate: infoUpdate,
  });
};

/**
 * @swagger
 * /api/v1/user/updateImage:
 *   post:
 *     summary: Update the user's profile picture
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image to upload ("png", "jpg", "jpeg")
 *     responses:
 *       200:
 *         description: Image updated successfully
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
 *                   example: File uploaded successfully
 *                 file:
 *                   type: string
 *                   example: imagen123.png
 *       400:
 *         description: Invalid or missing file
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
 */
const UploadImage = (req, res) => {
  let file = req.file;

  try {
    ValidateImage(file);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  try {
    UpdateUserImage(req.user.id, file);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(200).json({
    status: "OK",
    statusCode: 200,
    message: "File uploaded successfully",
    file: file.filename,
  });
};

module.exports = {
  Login,
  GetUsers,
  SignUpUser,
  GetUserProfile,
  UpdateUser,
  UploadImage,
  Avatar,
  Counters,
};
