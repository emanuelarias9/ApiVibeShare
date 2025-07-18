class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class Unauthorized extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class Forbidden extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class NotFound extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class Conflict extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

class UnsupportedMediaType extends HttpError {
  constructor(message = "Unsupported Media Type") {
    super(message, 415);
  }
}

class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  InternalServerError,
  UnsupportedMediaType,
};
