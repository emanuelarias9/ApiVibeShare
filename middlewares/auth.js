const jwt = require("jwt-simple");
const { Unauthorized } = require("../utilitario/HttpErrors");
const moment = require("moment");
const secret = process.env.SECRET;

const authenticate = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let httpError, payload, token, expired, now;

  if (!authHeader) {
    httpError = new Unauthorized(
      "No se encontró la cabecera de autenticación."
    );
    return res.status(httpError.statusCode).json({
      status: httpError.status,
      statusCode: httpError.statusCode,
      message: httpError.message,
    });
  }

  token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  token = token.trim().replace(/^"(.*)"$/, "$1");

  try {
    expired = jwt.decode(token, secret, true);
    now = moment().unix();
    if (expired.exp < now) {
      httpError = new Unauthorized("El token ha expirado.");
      return res.status(httpError.statusCode).json({
        status: httpError.status,
        statusCode: httpError.statusCode,
        message: httpError.message,
      });
    }

    payload = jwt.decode(token, secret);
    req.user = payload;
  } catch (error) {
    httpError = new Unauthorized("Token inválido o mal formado.");
    return res.status(httpError.statusCode).json({
      status: httpError.status,
      statusCode: httpError.statusCode,
      message: httpError.message,
    });
  }
  next();
};

module.exports = { authenticate };
