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
 *     summary: Crear una nueva publicación
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
 *                 description: Contenido del post
 *                 example: string
 *     responses:
 *       200:
 *         description: Publicación creada exitosamente
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
 *                   example: Publicacion Creada
 *                 savedPost:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: ID del usuario que creó la publicación
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
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       500:
 *         description: Error interno del servidor
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
