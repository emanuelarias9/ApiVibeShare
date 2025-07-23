const {
  InternalServerError,
  BadRequest,
  Conflict,
} = require("../../utilitario/HttpErrors");
const followModel = require("../../models/Follow");
const validator = require("validator");

const FollowUser = async (followedId, userLoggedId) => {
  if (!followedId || !validator.isMongoId(followedId)) {
    throw new BadRequest("El ID del usuario a seguir no es válido");
  }

  if (!userLoggedId || !validator.isMongoId(userLoggedId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  const followExists = await followModel
    .findOne({
      $and: [{ user: userLoggedId }, { followed: followedId }],
    })
    .exec();

  if (followExists) {
    throw new Conflict(`ya sigues a este usuario`);
  }

  const userToFollow = new followModel({
    user: userLoggedId,
    followed: followedId,
  });

  await userToFollow.save();

  if (!userToFollow) {
    throw new InternalServerError("Error al registrar el seguimiento");
  }

  return userToFollow;
};

module.exports = {
  FollowUser,
};
