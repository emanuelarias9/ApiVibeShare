const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../utilitario/HttpErrors");
const postModel = require("../../models/Post");
const { ValidateIdExist } = require("../User/UserService");
const validator = require("validator");
const CleanBody = require("../../utilitario/CleanBody");

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

module.exports = { SavePost };
