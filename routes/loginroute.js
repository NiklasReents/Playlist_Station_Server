const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/usermodel.js");

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
    res.send([
      token,
      loginName,
      "Successfully logged in as " + loginName + "!",
    ]);
  }
});

module.exports = router;
