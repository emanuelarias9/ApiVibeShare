const TestFollow = (req, res) => {
  res.status(200).send({
    message: "Test follow endpoint is working",
  });
};

module.exports = {
  TestFollow,
};
