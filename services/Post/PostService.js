const {
  InternalServerError,
  BadRequest,
  NotFound,
  Forbidden,
} = require("../../utilitario/HttpErrors");
const postModel = require("../../models/Post");
const { ValidateIdExist } = require("../User/UserService");
const validator = require("validator");
const CleanBody = require("../../utilitario/CleanBody");
const validateOwnership = require("../../utilitario/validateOwnership");
const { DeleteImage } = require("../../utilitario/ValidateImage");

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
      select: "username nick email image",
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
        select: "username nick email image",
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

module.exports = {
  SavePost,
  GetPostById,
  DeletePost,
  GetUserPosts,
  UploadPostImage,
};
