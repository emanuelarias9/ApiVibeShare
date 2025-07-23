const followModel = require("../../../models/Follow");
const userModel = require("../../../models/User");
const { FollowUser } = require("../../../services/Follow/FollowService");
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
    message: "Usuario seguido correctamente",
    followSaved,
  });
};

module.exports = {
  Follow,
};
