const followModel = require("../../../models/Follow");
const userModel = require("../../../models/User");
const {
  FollowUser,
  UnfollowUser,
} = require("../../../services/Follow/FollowService");

const Follow = async (req, res) => {
  const params = req.body;
  const userLogged = req.user;
  let followSaved;

  try {
    followSaved = await FollowUser(params.followed, userLogged.id);
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
    message: "Ahora sigues a este usuario",
    followSaved,
  });
};

const unfollow = async (req, res) => {
  let userUnfollowed;
  const followedId = req.params.id;
  const userLoggedId = req.user.id;

  try {
    userUnfollowed = await UnfollowUser(followedId, userLoggedId);
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
    message: "Ya no sigues a este usuario",
  });
};

module.exports = {
  Follow,
  unfollow,
};
