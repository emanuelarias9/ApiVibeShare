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

const FollowingList = async (params, userLoggedId) => {
  let page = parseInt(params.page || 1);
  let userId = params.id || userLoggedId;
  const pageSize = 5;
  let followingList; //Listado de usuarios a los que sigue el usuario pasado en params
  let followingLoggedUser; //Listado de usuarios a los que sigue el usuario logeado
  let followersLoggedUser; //Listado de usuarios que siguen el usuario logeado

  const options = {
    page,
    limit: pageSize,
    sort: { _id: 1 },
    populate: [
      {
        path: "user",
        select: "username nick email image",
      },
      {
        path: "followed",
        select: "username nick email image",
      },
    ],
  };

  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  // @ts-ignore
  followingList = await followModel.paginate({ user: userId }, options);

  followingLoggedUser = await followingListLoggedUser(userLoggedId);

  followersLoggedUser = await followersListLoggedUser(userLoggedId);

  return [followingList, followingLoggedUser, followersLoggedUser];
};

const followingListLoggedUser = async (userLoggedId) => {
  let following;
  let followingClean = [];

  following = await followModel
    .find({ user: userLoggedId })
    .select({ followed: 1, _id: 0 })
    .exec();

  following.forEach((follow) => {
    followingClean.push(follow.followed);
  });

  return followingClean;
};

const followersListLoggedUser = async (userLoggedId) => {
  let followers;
  let followersClean = [];

  followers = await followModel
    .find({ followed: userLoggedId })
    .select({ user: 1, _id: 0 })
    .exec();

  followers.forEach((follow) => {
    followersClean.push(follow.user);
  });

  return followersClean;
};

const followUserInfo = async (userProfileId, userLoggedId) => {
  let follower, following;
  if (!userProfileId || !validator.isMongoId(userProfileId)) {
    throw new BadRequest("El ID del usuario no es válido: userProfileId");
  }

  if (!userLoggedId || !validator.isMongoId(userLoggedId)) {
    throw new BadRequest("El ID del usuario no es válido: userLoggedId");
  }

  following = await followModel
    .findOne({ followed: userProfileId, user: userLoggedId })
    .exec();

  follower = await followModel
    .findOne({ followed: userLoggedId, user: userProfileId })
    .exec();

  return { following, follower };
};

module.exports = {
  FollowUser,
  UnfollowUser,
  FollowingList,
  followUserInfo,
};
