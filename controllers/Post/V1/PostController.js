const TestPost = (req, res) => {
  res.status(200).send({
    message: "Test post endpoint is working",
  });
};

module.exports = {
  TestPost,
};
