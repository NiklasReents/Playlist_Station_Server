const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/usermodel.js");

router.post("/getuser", async (req, res) => {
  const loginName = req.body.loginName;
  const userFound = await User.findOne({ username: loginName });

  if (userFound && userFound.username !== "User") {
    res.send({ username: userFound.username, email: userFound.email });
  } else res.send("No user found!");
});

router.post("/", async (req, res) => {
  const loginName = req.body.loginName;
  const password = req.body.password;

  const userFound = await User.find().then((users) => {
    return users.some((v) => {
      return loginName === v.username && password === v.password;
    });
  });

  if (loginName.match(/(User)/i)) res.send("Cannot log in as 'User'!");
  else if (!userFound) res.send("Wrong username and/or password!");
  else {
    const token = jwt.sign({ loginName: loginName }, process.env.JWTKEY, {
      expiresIn: "1 day",
    });
    res.send({
      token: token,
      loginName: loginName,
      message: "Successfully logged in as " + loginName + "!",
    });
  }
});

module.exports = router;
