const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create and reuse the transporter outside of the route
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pparthiv.human@gmail.com",
    pass: "pkylajqamigpesyh",
  },
});

app.post("/send-email", (req, res) => {
  const { email, from, message } = req.body;

  const mailOptions = {
    from: "pparthiv.human@gmail.com",
    to: "pparthiv.human@gmail.com",
    replyTo: email,
    subject: `New message from ${email}`,
    text: `From: ${from}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Offload sending emails with a non-blocking approach
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(5000);
