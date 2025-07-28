const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  text: { type: String, required: true },
  file: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Post", PostSchema, "post");
