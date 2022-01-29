const jwt = require("jsonwebtoken");
const router = require("express").Router();
const formidable = require("formidable");
const path = require("path");

const Playlist = require("../models/playlistmodel.js");

function userAuth(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, process.env.JWTKEY, (err, user) => {
      req.user = !user ? "User" : user.loginName;
      next && next();
    });
  } else res.sendStatus(401);
}

router.post("/", userAuth, (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "public/files"),
    type: "multipart",
  });
  form.parse(req, async (err, fields, files) => {
    const playlistname = fields.playlistname;
    const imagefile = files.imagefile.filepath;
    const songfile = files.songfile.filepath;
    const song = fields.song;
    const artist = fields.artist;
    const genre = fields.genre;
    const newSong = {
      imagefile: imagefile,
      songfile: songfile,
      song: song,
      artist: artist,
      genre: genre,
    };
    const newList = {
      username: req.user,
      playlistname: playlistname,
      values: [newSong],
    };

    try {
      const list = await Playlist.find();
      let i = 0;
      let len = list.length;
      let listFound = false;

      for (i; i < len; i++) {
        if (req.user === list[i].username) {
          if (playlistname === list[i].playlistname) {
            list[i].values.push(newSong);
            list[i].save();
            listFound = true;
            if (listFound) break;
          } else listFound = false;
        }
      }
      if (!listFound) await Playlist.create(newList);
    } catch (err) {
      console.error(err);
    }
    if (err) res.send(err);
  });
  form.on("fileBegin", (name, file) => {
    file.filepath = path.join(
      process.cwd(),
      "/public/files/",
      file.originalFilename
    );
  });
  res.send("Song uploaded!");
});

module.exports = router;
