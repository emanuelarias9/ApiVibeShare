const validator = require("validator");
const userModel = require("../models/User");

const ValidateBasicInfoUser = (params) => {
  if (validator.isEmpty(params.username, { ignore_whitespace: true })) {
    throw new Error("El nombre de usuario es obligatorio");
  }
  if (validator.isEmpty(params.nick, { ignore_whitespace: true })) {
    throw new Error("El nick es obligatorio");
  }
  if (validator.isEmpty(params.email, { ignore_whitespace: true })) {
    throw new Error("El email es obligatorio");
  }
  if (!validator.isEmail(params.email)) {
    throw new Error("El email no es válido");
  }
  if (validator.isEmpty(params.password, { ignore_whitespace: true })) {
    throw new Error("La contraseña es obligatoria");
  }
  if (params.password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }
};

const ValidateUserExists = async (params) => {
  const email = params.email.toLowerCase();
  const username = params.username.toLowerCase();

  const userExists = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .exec();

  if (userExists && userExists.email === email) {
    throw new Error(`El email ${email} ya está registrado`);
  }

  if (userExists && userExists.username === username) {
    throw new Error(`El nombre de usuario ${username} ya está registrado`);
  }
};

const ValidateLoginInfo = (params) => {
  if (validator.isEmpty(params.email, { ignore_whitespace: true })) {
    throw new Error("No has ingresado el email");
  }
  if (!validator.isEmail(params.email)) {
    throw new Error("El email no es válido");
  }
  if (validator.isEmpty(params.password, { ignore_whitespace: true })) {
    throw new Error("No has ingresado la contraseña");
  }
};

const ValidateLoginCredentials = async (params) => {
  const email = params.email.toLowerCase();
  const user = await userModel.findOne({ email }).exec();

  if (!user || user.length === 0) {
    throw new Error("El usuario no existe");
  }

  let password = bcrypyt.compareSync(params.password, user.password);
  if (password === false) {
    throw new Error("La contraseña es incorrecta");
  }
};

module.exports = {
  ValidateBasicInfoUser,
  ValidateUserExists,
  ValidateLoginInfo,
  ValidateLoginCredentials,
};
