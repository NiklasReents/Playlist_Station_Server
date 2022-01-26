const router = require("express").Router();

const User = require("../models/usermodel.js");

router.post("/", async (req, res) => {
  const registerName = req.body.registerName;
  const password = req.body.password;
  const email = req.body.email;
  const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const userFound = await User.find()
    .then((users) => {
      return users.some((v) => {
        return (
          registerName === v.username ||
          password === v.password ||
          email === v.email
        );
      });
    })
    .catch((err) => res.send(err));

  switch (true) {
    case registerName.length < 3:
      res.send("Name needs to contain at least 3 characters!");
      break;
    case password.length < 8:
      res.send("Password needs to contain at least 8 characters!");
      break;
    case !email.match(mailPattern):
      res.send("Please type in a proper email address!");
      break;
    case userFound:
      res.send("Name, password and/or email already exist(s)!");
      break;
    default:
      new User({
        username: registerName,
        password: password,
        email: email,
      })
        .save()
        .then(() => {
          res.send("Successfully registered as " + registerName + "!");
        })
        .catch((err) => res.send(err));
  }
});

module.exports = router;
