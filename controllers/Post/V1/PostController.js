const postModel = require("../../../models/Post");
const CleanBody = require("../../../utilitario/CleanBody");
const { SavePost } = require("../../../services/Post/PostService");

const TestPost = (req, res) => {
  res.status(200).send({
    message: "Test post endpoint is working",
  });
};

const Save = async (req, res) => {
  const params = CleanBody(req.body);
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

module.exports = {
  TestPost,
  Save,
};
