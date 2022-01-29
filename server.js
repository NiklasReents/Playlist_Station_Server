const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const playlistRouter = require("./routes/playlistroute.js");
const registerRouter = require("./routes/registerroute.js");
const loginRouter = require("./routes/loginroute.js");
const mailRouter = require("./routes/mailroute.js");

const app = express();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/playlists", playlistRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/sendmail", mailRouter);

mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("Atlas connection established!");
});

app
  .get("/", (req, res) => res.send("Online"))
  .listen(port, () => console.log(`Server running on port ${port}!`));
