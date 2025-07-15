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
 *         username:
 *           type: string
 *           example: "johndoe"
 *         nick:
 *           type: string
 *           example: "johnny"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "StrongPassword123"
 *         role:
 *           type: string
 *           example: "user"
 *         image:
 *           type: string
 *           example: "profile.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 */

const UserSchema = new Schema({
  username: { type: String, required: true },
  nick: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "user");
