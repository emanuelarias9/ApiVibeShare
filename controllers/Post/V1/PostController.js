const postModel = require("../../../models/Post");
const CleanBody = require("../../../utilitario/CleanBody");
const {
  SavePost,
  GetPostById,
  DeletePost,
} = require("../../../services/Post/PostService");

const TestPost = (req, res) => {
  res.status(200).send({
    message: "Test post endpoint is working",
  });
};

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

module.exports = {
  TestPost,
  Save,
  Detail,
  Delete,
};
