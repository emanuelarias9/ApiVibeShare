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

module.exports = { SavePost, GetPostById, DeletePost };
