const fs = require("fs");
const {
  BadRequest,
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
};

const DeleteImage = (image) => {
  let path = `./uploads/users/avatars/${image}`;
  if (fs.existsSync(path) && image !== "default.png") {
    fs.unlinkSync(path);
  }
};
module.exports = { ValidateImage, DeleteImage };
