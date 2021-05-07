const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const options = {
    from: process.env.EMAIL_USERNAME,
    to : "zoullata001@gmail.com",
    subject: "testing SMTP basis sytem",
    text: `this a test\n
    this is a simple SMTP system to easy send mails to people on mass\n
    offcorse this is just the shitt start!
    `
};

transporter.sendMail(options, (err, res) => {
    if (err) return console.log(err);
    console.log('email sent: ', res);
});