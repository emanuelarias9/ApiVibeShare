const TestUser = (req, res) => {
  res.status(200).send({
    message: "Test user endpoint is working",
  });
};

module.exports = {
  TestUser,
};
