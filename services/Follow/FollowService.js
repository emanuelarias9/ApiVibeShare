const {
  InternalServerError,
  BadRequest,
  Conflict,
  NotFound,
} = require("../../utilitario/HttpErrors");
const followModel = require("../../models/Follow");
const validator = require("validator");

const FollowUser = async (followedId, userLoggedId) => {
  let followExists = await ValidateFollow(followedId, userLoggedId);

  if (followExists) {
    throw new Conflict(`ya sigues a este usuario`);
  }

  const userFollowed = new followModel({
    user: userLoggedId,
    followed: followedId,
  });

  await userFollowed.save();

  if (!userFollowed) {
    throw new InternalServerError("Error al registrar el seguimiento");
  }

  return userFollowed;
};

const UnfollowUser = async (followedId, userLoggedId) => {
  let followExists = await ValidateFollow(followedId, userLoggedId);

  if (!followExists) {
    throw new NotFound(`No sigues a este usuario`);
  }

  const userUnfollowed = await followModel.findOneAndDelete({
    user: userLoggedId,
    followed: followedId,
  });

  if (!userUnfollowed) {
    throw new InternalServerError("Error al eliminar el seguimiento");
  }

  return userUnfollowed;
};

const ValidateFollow = async (followedId, userLoggedId) => {
  if (!followedId || !validator.isMongoId(followedId)) {
    throw new BadRequest("El ID del usuario no es válido: followedId");
  }

  if (!userLoggedId || !validator.isMongoId(userLoggedId)) {
    throw new BadRequest("El ID del usuario no es válido: userLoggedId");
  }

  const followExists = await followModel
    .findOne({
      $and: [{ user: userLoggedId }, { followed: followedId }],
    })
    .exec();

  return followExists;
};

const FollowingList = async (params, userId) => {
  let page = parseInt(params.page || 1);
  userId = params.id || userId;
  const pageSize = 5;
  let followingList;

  const options = {
    page,
    limit: pageSize,
    sort: { _id: 1 },
    populate: ["user", "followed"],
  };

  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  // @ts-ignore
  followingList = await followModel.paginate({ user: userId }, options);

  return followingList;
};

module.exports = {
  FollowUser,
  UnfollowUser,
  FollowingList,
};
