const router = require("express").Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const Token = require("../models/emailtokenmodel.js");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const mailId = crypto
    .createHmac("sha256", Math.random().toString())
    .digest("hex");

  await Token.create({ token: mailId });

  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PW,
    },
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Playlist Station - Change Password",
    text: `
    Hello, ${email}, 
    you requested to change your password. 
    Click <a href="${req.headers.origin}/${mailId}?email=${email}" target="_blank">here</a> to change it! 
    This link will be valid for half an hour.
    If you want to leave your password as it is, please ignore this email. 
    Best regards, Nik
    `,
    html: `
    <body>
      <h1>Hello ${email},</h1>
      <p>you requested to change your password. Click <a href="${req.headers.origin}/${mailId}?email=${email}" target="_blank">here</a> to change it!</p>
      <p>This link will be valid for half an hour.</p>
      <p>If you want to leave your password as it is, please ignore this email.</p>
      <h2>Best regards, Nik</h2>
    </body>
    `,
  };
  transport.sendMail(mailOptions, async (err, info) => {
    if (info) res.send("Email sent to: " + info.accepted[0] + "!");
    else {
      await Token.findOneAndDelete({ token: mailId });
      res.send(err);
    }
  });
});

module.exports = router;
