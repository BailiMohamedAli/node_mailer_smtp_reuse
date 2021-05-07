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
    html: `<h1>this a test</h1>
    <p>this is a simple SMTP system to easy send mails to people on mass</p>
    <p>offcorse this is just the shitt start!</p>
    `
};

transporter.sendMail(options, (err, res) => {
    if (err) return console.log(err);
    console.log('email sent: ', res);
});