const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       required:
 *         - user
 *         - followed
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del seguimiento.
 *           example: 64a1f0c6e5b4f20012d34abc
 *         user:
 *           type: string
 *           description: ID del usuario que sigue.
 *           example: 64a1ef98e5b4f20012d349fe
 *         followed:
 *           type: string
 *           description: ID del usuario seguido.
 *           example: 64a1efbce5b4f20012d34a23
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del seguimiento.
 *           example: 2025-07-27T20:15:43.511Z
 */

const FollowSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  followed: { type: Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

FollowSchema.plugin(mongoosePaginate);

module.exports = model("Follow", FollowSchema, "follow");
