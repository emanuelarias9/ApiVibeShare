const fs = require("fs");
const {
  BadRequest,
  NotFound,
  InternalServerError,
  UnsupportedMediaType,
} = require("../utilitario/HttpErrors");

const ValidateImage = (file) => {
  if (!file) {
    throw new BadRequest("No se ha subido la imagen");
  }

  let fileName = file.originalname;
  let extension = fileName.split(".").pop();
  let validExtensions = ["png", "jpg", "jpeg"];

  if (!validExtensions.includes(extension)) {
    fs.unlinkSync(file.path);
    throw new UnsupportedMediaType(
      "Formato de imagen no válido, formatos permitidos: " +
        validExtensions.join(", ")
    );
  }
  return extension;
};

const DeleteImage = (image) => {
  if (fs.existsSync(image.path) && image.filename !== "default.png") {
    fs.unlinkSync(image.path);
  }
};
module.exports = { ValidateImage, DeleteImage };
