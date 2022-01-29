const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlist = {
  username: String,
  playlistname: String,
  values: [
    {
      imagefile: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
      },
      songfile: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
      },
      song: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
      },
      artist: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
      },
      genre: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
      },
    },
  ],
};

const playlistSchema = new Schema(playlist, { timestamps: true });

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
