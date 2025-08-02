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

/**
 * @swagger
 * /api/v1/post/detail/{id}:
 *   get:
 *     summary: Obtener el detalle de una publicación
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post a consultar
 *         schema:
 *           type: string
 *           example: 68899c45b056a0c5edbcc76b
 *     responses:
 *       200:
 *         description: Detalle del post obtenido exitosamente
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
 *                       example: publicacion 8
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-30T04:15:01.133Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
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
 *     summary: Eliminar una publicación por su ID
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post que se desea eliminar
 *         schema:
 *           type: string
 *           example: 68899c29b056a0c5edbcc75d
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
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
 *         description: No autorizado, token JWT inválido o ausente
 *       403:
 *         description: No tienes permiso para eliminar este post
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error interno del servidor
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
 *     summary: Obtener las publicaciones de un usuario específico con paginación
 *     tags:
 *       - Post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario cuyas publicaciones se desean obtener
 *         schema:
 *           type: string
 *           example: 68788e3cf8d7114cece523ab
 *       - in: path
 *         name: page
 *         required: false
 *         description: Número de página para paginación (por defecto 1)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista paginada de publicaciones del usuario
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
 *                             example: publicacion 12
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-08-02T04:21:42.092Z
 *       401:
 *         description: No autorizado, token JWT inválido o ausente
 *       404:
 *         description: Usuario no encontrado o sin publicaciones
 *       500:
 *         description: Error interno del servidor
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
