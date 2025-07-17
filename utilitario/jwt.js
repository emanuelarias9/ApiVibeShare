const jwt = require("jwt-simple");
const moment = require("moment");

const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(), // Issued at time
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, process.env.SECRET);
};

module.exports = {
  createToken,
};
