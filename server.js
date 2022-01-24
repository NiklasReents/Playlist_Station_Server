const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(cors({ origin: "*" }));

mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("Atlas connection established!");
});

app
  .get("/", (req, res) => res.status(200).send("Online"))
  .listen(port, () => console.log(`Server running on port ${port}!`));
