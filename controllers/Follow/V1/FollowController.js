const followModel = require("../../../models/Follow");
const userModel = require("../../../models/User");

const TestFollow = (req, res) => {
  res.status(200).send({
    message: "Test follow endpoint is working",
  });
};

const Follow = (req, res) => {
  res.status(200).send({
    status: "OK",
    statusCode: 200,
    message: "Test follow endpoint is working",
  });
};

module.exports = {
  TestFollow,
  Follow,
};
