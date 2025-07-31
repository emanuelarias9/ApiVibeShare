const {
  SavePost,
  GetPostById,
  DeletePost,
  GetUserPosts,
  UploadPostImage,
  GetPostImage,
} = require("../../../services/Post/PostService");
const { ValidateImage } = require("../../../utilitario/ValidateImage");

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

module.exports = {
  Save,
  Detail,
  Delete,
  UserPosts,
  UploadImage,
  PostImage,
};
