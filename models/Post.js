const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  text: { type: String, required: true },
  file: { type: String },
  createdAt: { type: Date, default: Date.now },
});

PostSchema.plugin(mongoosePaginate);

module.exports = model("Post", PostSchema, "post");
