const { Schema, model } = require("mongoose");

const FollowSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  followed: { type: Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Follow", FollowSchema, "follow");
