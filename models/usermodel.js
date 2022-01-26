const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
};

const userSchema = new Schema(user, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
