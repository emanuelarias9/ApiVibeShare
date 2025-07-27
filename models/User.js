const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - nick
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único generado por MongoDB.
 *           example: "64f19c0b6b2f2c3e3a1e8d41"
 *         username:
 *           type: string
 *           description: Nombre de usuario único.
 *           example: "emanuelarias"
 *         nick:
 *           type: string
 *           description: Apodo del usuario.
 *           example: "EmaDev"
 *         bio:
 *           type: string
 *           description: Biografía del usuario.
 *           example: "Desarrollador full-stack apasionado por el código limpio."
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario.
 *           example: "ema@correo.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña hasheada del usuario.
 *           example: "$2b$10$Mdoz8o9ybnt2aZW/ADe/d.hrHz..."
 *         role:
 *           type: string
 *           description: Rol del usuario (por defecto es "user").
 *           example: "user"
 *         image:
 *           type: string
 *           description: Nombre del archivo de imagen del perfil.
 *           example: "default.png"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario.
 *           example: "2024-07-15T20:45:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización.
 *           example: "2024-07-15T22:10:12.000Z"
 */

const UserSchema = new Schema({
  username: { type: String, required: true },
  nick: { type: String, required: true },
  bio: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  image: { type: String, default: "default.png" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "user");
