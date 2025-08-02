const {
  InternalServerError,
  BadRequest,
  NotFound,
  Forbidden,
} = require("../../utilitario/HttpErrors");
const postModel = require("../../models/Post");
const path = require("path");
const validator = require("validator");
const CleanBody = require("../../utilitario/CleanBody");
const validateOwnership = require("../../utilitario/validateOwnership");
const { DeleteImage } = require("../../utilitario/ValidateImage");
const { FollowingListLoggedUser } = require("../Follow/FollowService");

const SavePost = async (params, userId) => {
  let newPost;
  let cleanParams;
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }

  cleanParams = CleanBody(params);

  if (!cleanParams.text) {
    throw new BadRequest("No se puede crear una publicacion vacia");
  }

  newPost = new postModel({
    text: cleanParams.text,
    user: userId,
  });

  await newPost.save();

  if (!newPost) {
    throw new InternalServerError("Error al crear la publicacion");
  }

  return newPost;
};

const GetPostById = async (postId) => {
  if (!postId || !validator.isMongoId(postId)) {
    throw new BadRequest("El ID de la publicacion no es válido");
  }
  const post = await postModel
    .findById(postId)
    .populate({
      path: "user",
      select: "username nick image",
    })
    .exec();
  if (!post) {
    throw new NotFound("Publicacion no encontrada");
  }
  return post;
};

const DeletePost = async (postId, userId) => {
  if (!postId || !validator.isMongoId(postId)) {
    throw new BadRequest("El ID de la publicacion no es válido");
  }
  const {
    exists,
    isOwner,
    doc: post,
  } = await validateOwnership(postModel, postId, userId);

  if (!exists) {
    throw new NotFound("Publicacion no encontrada");
  }
  if (!isOwner) {
    throw new Forbidden("No tienes permisos para eliminar este post");
  }
  const Deletedpost = await post.deleteOne();

  return Deletedpost;
};

const GetUserPosts = async (params) => {
  let pageSize = 5;
  let cleanParams, userId, posts, page;

  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }

  cleanParams = CleanBody(params);

  page = parseInt(cleanParams.page || 1);
  userId = cleanParams.id;
  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID de usuario no es válido");
  }

  const options = {
    page,
    limit: pageSize,
    populate: [
      {
        path: "user",
        select: "username nick image",
      },
    ],
    sort: { createdAt: -1 },
    select: { __v: 0 },
  };

  // @ts-ignore
  posts = await postModel.paginate({ user: userId }, options);
  return posts;
};

const UploadPostImage = async (userId, params, file) => {
  let cleanParams, postId, postUpdated;
  if (!params) {
    DeleteImage(file.filename);
    throw new BadRequest("Los parámetros son obligatorios");
  }

  cleanParams = CleanBody(params);
  postId = cleanParams.id;
  if (!postId || !validator.isMongoId(postId)) {
    DeleteImage(file.filename, "post");
    throw new BadRequest("El ID de publicacion no es válido");
  }

  postUpdated = await postModel
    .findOneAndUpdate(
      { _id: postId, user: userId },
      { file: file.filename },
      { new: false }
    )
    .exec();

  if (!postUpdated) {
    DeleteImage(file.filename, "post");
    throw new NotFound("Publicacion no encontrada");
  }
  DeleteImage(postUpdated.file, "post");
  return postUpdated;
};

const GetPostImage = async (params) => {
  let cleanParams, postId;
  cleanParams = CleanBody(params);
  postId = cleanParams.id;
  if (!validator.isMongoId(postId)) {
    throw new BadRequest("El ID de publicacion no es válido");
  }

  const post = await postModel.findById(postId).exec();

  if (!post) {
    throw new NotFound("Publicacion no encontrada");
  }

  let filepath = path.resolve(`./uploads/posts/${post.file}`);

  return filepath;
};

const GetFeed = async (userId, params) => {
  let cleanParams, page, following, feed;
  let pageSize = 5;

  cleanParams = CleanBody(params);
  page = parseInt(cleanParams.page || 1);
  following = await FollowingListLoggedUser(userId);

  const options = {
    page,
    limit: pageSize,
    populate: [
      {
        path: "user",
        select: "username nick image",
      },
    ],
    sort: { createdAt: -1 },
    select: { __v: 0 },
  };

  // @ts-ignore
  feed = await postModel.paginate({ user: { $in: following } }, options);
  if (!feed) {
    throw new InternalServerError("Error al obtener el feed.");
  }
  return feed;
};

module.exports = {
  SavePost,
  GetPostById,
  DeletePost,
  GetUserPosts,
  UploadPostImage,
  GetPostImage,
  GetFeed,
};
