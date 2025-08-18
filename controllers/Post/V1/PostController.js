const {
  SavePost,
  GetPostById,
  DeletePost,
  GetUserPosts,
  UploadPostImage,
  GetPostImage,
  GetFeed,
} = require("../../../services/Post/PostService");
const { ValidateImage } = require("../../../utilitario/ValidateImage");
/**
 * @swagger
 * /api/v1/post/save:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Post content
 *                 example: string
 *     responses:
 *       200:
 *         description: Post created successfully
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
 *                   example: Post Created
 *                 savedPost:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: ID of the user who created the post
 *                       example: 68788e3cf8d7114cece523ab
 *                     text:
 *                       type: string
 *                       example: publicacion 12
 *                     file:
 *                       type: string
 *                       example: imagen-post-123.jpg
 *                     _id:
 *                       type: string
 *                       example: 688d925629013fb68a029308
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-08-02T04:21:42.092Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid data in the request
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
 */
const Save = async (req, res) => {
  const params = req.body;
  let savedPost;
  try {
    savedPost = await SavePost(params, req.user.id);
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
    message: "Publicacion Creada",
    savedPost,
  });
};

/**
 * @swagger
 * /api/v1/post/detail/{id}:
 *   get:
 *     summary: Get the details of a post
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID to search for
 *         schema:
 *           type: string
 *           example: 68899c45b056a0c5edbcc76b
 *     responses:
 *       200:
 *         description: Detail of the post obtained successfully
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
 *                 post:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 68899c45b056a0c5edbcc76b
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 68788e3cf8d7114cece523ab
 *                         username:
 *                           type: string
 *                           example: emanuelariasjoiro
 *                         nick:
 *                           type: string
 *                           example: EmaDev
 *                         image:
 *                           type: string
 *                           example: Avatar-1752892768732-will.jpg
 *                     text:
 *                       type: string
 *                       example: post 42
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-30T04:15:01.133Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
const Detail = async (req, res) => {
  let post;
  try {
    post = await GetPostById(req.params.id);
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
    post,
  });
};

/**
 * @swagger
 * /api/v1/post/delete/{id}:
 *   delete:
 *     summary: Delete a post by its ID
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post you want to delete
 *         schema:
 *           type: string
 *           example: 68899c29b056a0c5edbcc75d
 *     responses:
 *       200:
 *         description: Post successfully deleted
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
 *                 Deletedpost:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       403:
 *         description: You do not have permission to delete this post.
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
const Delete = async (req, res) => {
  let Deletedpost;
  try {
    Deletedpost = await DeletePost(req.params.id, req.user.id);
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
    Deletedpost,
  });
};

/**
 * @swagger
 * /api/v1/post/userPosts/{id}/{page}:
 *   get:
 *     summary: Get paginated posts from a specific user
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose posts you want to get
 *         schema:
 *           type: string
 *           example: 68788e3cf8d7114cece523ab
 *       - in: path
 *         name: page
 *         required: false
 *         description: Page number for pagination (default 1)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Paginated list of user posts
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
 *                 posts:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 5
 *                     totalPosts:
 *                       type: integer
 *                       example: 11
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     prevPage:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                       example: 2
 *                     posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 688d925629013fb68a029308
 *                           user:
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
 *                                 example: EmaDev
 *                               image:
 *                                 type: string
 *                                 example: Avatar-1752892768732-will.jpg
 *                           text:
 *                             type: string
 *                             example: post 42
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-08-02T04:21:42.092Z
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
 */
const UserPosts = async (req, res) => {
  let posts;
  try {
    posts = await GetUserPosts(req.params);
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
    posts: {
      page: posts.page,
      pageSize: posts.limit,
      totalPosts: posts.totalDocs,
      totalPages: posts.totalPages,
      hasPrevPage: posts.hasPrevPage,
      hasNextPage: posts.hasNextPage,
      prevPage: posts.prevPage,
      nextPage: posts.nextPage,
      posts: posts.docs,
    },
  });
};

/**
 * @swagger
 * /api/v1/post/uploadImage/{id}:
 *   post:
 *     summary: Upload an image to an existing post
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to which you want to upload the image
 *         schema:
 *           type: string
 *           example: 68899c2db056a0c5edbcc75f
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 68899c2db056a0c5edbcc75f
 *                     text:
 *                       type: string
 *                       example: publicacion 42
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-30T04:14:37.705Z
 *                     file:
 *                       type: string
 *                       example: Post-1754113207437-default.png
 *       400:
 *         description: Invalid or missing file
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       403:
 *         description: You do not have permission to edit this post.
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
const UploadImage = async (req, res) => {
  let file = req.file;
  let postUpdated;
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
    postUpdated = await UploadPostImage(req.user.id, req.params, file);
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
    post: {
      id: postUpdated._id,
      text: postUpdated.text,
      createdAt: postUpdated.createdAt,
      file: file.filename,
    },
  });
};

/**
 * @swagger
 * /api/v1/post/postImage/{id}:
 *   get:
 *     summary: Get the image associated with a post
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post whose image you want to obtain
 *         schema:
 *           type: string
 *           example: 68899c2db056a0c5edbcc75f
 *     responses:
 *       200:
 *         description: Image returned successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/webp:
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
const PostImage = async (req, res) => {
  let postImage;
  try {
    postImage = await GetPostImage(req.params);
  } catch (error) {
    return res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.sendFile(postImage); // Send the image file directly
};

/**
 * @swagger
 * /api/v1/post/feed/{page}:
 *   get:
 *     summary: Get the feed of posts from followed users
 *     tags:
 *       - Post
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
 *     responses:
 *       200:
 *         description: Feed successfully obtained
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
 *                 feed:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 5
 *                     totalPosts:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *                     hasNextPage:
 *                       type: boolean
 *                       example: false
 *                     prevPage:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 688837a0738790b32f4e8e0b
 *                           user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 68826f5db2dcc94a75398a84
 *                               username:
 *                                 type: string
 *                                 example: adenness0
 *                               nick:
 *                                 type: string
 *                                 example: Abigale
 *                               image:
 *                                 type: string
 *                                 example: default.png
 *                           text:
 *                             type: string
 *                             example: "Publicacion test"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-07-29T02:53:20.917Z
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       500:
 *         description: Internal Server Error
 */
const Feed = async (req, res) => {
  let feed;
  try {
    feed = await GetFeed(req.user.id, req.params);
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
    feed: {
      page: feed.page,
      pageSize: feed.limit,
      totalPosts: feed.totalDocs,
      totalPages: feed.totalPages,
      hasPrevPage: feed.hasPrevPage,
      hasNextPage: feed.hasNextPage,
      prevPage: feed.prevPage,
      nextPage: feed.nextPage,
      posts: feed.docs,
    },
  });
};

module.exports = {
  Save,
  Detail,
  Delete,
  UserPosts,
  UploadImage,
  PostImage,
  Feed,
};
