const jwt = require("jwt-simple");
const { Unauthorized } = require("../utilitario/HttpErrors");
const moment = require("moment");
const secret = process.env.SECRET;

const authenticate = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let payload;
  let token;

  if (!authHeader) {
    let httpError = new Unauthorized(
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
    payload = jwt.decode(token, secret);
    req.user = payload;
  } catch (error) {
    let isExpired = error.message.toLowerCase().includes("token expired");
    let httpError = new Unauthorized(
      isExpired
        ? "El token ha expirado. Por favor, inicie sesión nuevamente"
        : "Token inválido o mal formado."
    );
    return res.status(httpError.statusCode).json({
      status: httpError.status,
      statusCode: httpError.statusCode,
      message: httpError.message,
    });
  }
  next();
};

module.exports = { authenticate };
