const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const token = {
  token: {
    type: String,
    required: true,
    trim: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 1800 },
  },
};

const tokenSchema = new Schema(token, { timestamps: true });

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
