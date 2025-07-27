const {
  InternalServerError,
  BadRequest,
  Conflict,
  NotFound,
} = require("../../utilitario/HttpErrors");
const followModel = require("../../models/Follow");
const { ValidateIdExist } = require("../User/UserService");
const validator = require("validator");

const FollowUser = async (params, userLoggedId) => {
  if (!params) {
    throw new BadRequest("El parámetro followed es obligatorio");
  }

  let followedId = params.followed;
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

  let exist = await ValidateIdExist(followedId);

  if (!exist) {
    throw new NotFound(`"El usuario no existe."`);
  }

  const followExists = await followModel
    .findOne({
      $and: [{ user: userLoggedId }, { followed: followedId }],
    })
    .exec();

  return followExists;
};

const FollowingList = async (params, userLoggedId) => {
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
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
    select: { _id: 0, __v: 0 },
    populate: [
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

  followingLoggedUser = await FollowingListLoggedUser(userLoggedId);

  followersLoggedUser = await FollowersListLoggedUser(userLoggedId);

  return [followingList, followingLoggedUser, followersLoggedUser];
};

const FollowersList = async (params, userLoggedId) => {
  if (!params) {
    throw new BadRequest("Los parámetros son obligatorios");
  }
  let page = parseInt(params.page || 1);
  let userId = params.id || userLoggedId;
  const pageSize = 5;
  let followersList; //Listado de usuarios que siguen al usuario pasado en params
  let followingLoggedUser; //Listado de usuarios a los que sigue el usuario logeado
  let followersLoggedUser; //Listado de usuarios que siguen el usuario logeado

  const options = {
    page,
    limit: pageSize,
    sort: { _id: 1 },
    select: { _id: 0, __v: 0 },
    populate: [
      {
        path: "user",
        select: "username nick email image",
      },
    ],
  };

  if (!userId || !validator.isMongoId(userId)) {
    throw new BadRequest("El ID del usuario no es válido");
  }

  // @ts-ignore
  followersList = await followModel.paginate({ followed: userId }, options);

  followingLoggedUser = await FollowingListLoggedUser(userLoggedId);

  followersLoggedUser = await FollowersListLoggedUser(userLoggedId);

  return [followersList, followingLoggedUser, followersLoggedUser];
};

const FollowingListLoggedUser = async (userLoggedId) => {
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

const FollowersListLoggedUser = async (userLoggedId) => {
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

const FollowUserInfo = async (userProfileId, userLoggedId) => {
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
  FollowUserInfo,
  FollowersList,
  FollowingListLoggedUser,
  FollowersListLoggedUser,
};
