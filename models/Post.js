const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - user
 *         - text
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del post
 *           example: 68a31d65e1c203abf68f2c90
 *         user:
 *           type: string
 *           description: ID del usuario que creó el post
 *           example: 68788e3cf8d7114cece523ab
 *         text:
 *           type: string
 *           description: Contenido del post
 *           example: ¡Este es mi primer post en la red social!
 *         file:
 *           type: string
 *           description: Nombre del archivo multimedia (imagen/video) asociado al post
 *           example: post-img-123456.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del post
 *           example: 2025-07-30T14:25:36.000Z
 */
const PostSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  text: { type: String, required: true },
  file: { type: String },
  createdAt: { type: Date, default: Date.now },
});

PostSchema.plugin(mongoosePaginate);

module.exports = model("Post", PostSchema, "post");
