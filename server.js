const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const registerRouter = require("./routes/registerroute.js");
const loginRoute = require("./routes/loginroute.js");

const app = express();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/register", registerRouter);
app.use("/login", loginRoute);

mongoose.connect(uri);
mongoose.connection.once("open", () => {
  console.log("Atlas connection established!");
});

app
  .get("/", (req, res) => res.send("Online"))
  .listen(port, () => console.log(`Server running on port ${port}!`));
