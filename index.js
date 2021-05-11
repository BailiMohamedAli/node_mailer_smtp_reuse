const express = require("express");
const app = express();
const path = require("path");
//mailer config
const nodemailer = require('nodemailer');
// const mailgun = require('nodemailer-mailgun-transport');
const {mailValid} = require('./routes/middleware/emailverify');
require('dotenv').config();

const PORT = 3001;
//data utilities
const {nav} = require("./routes/data")


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// setting up mailgun auth
// const auth ={
//     auth: {
//         api_key: process.env.MAIL_GUN_KEY,
//         domain: process.env.MAIL_GUN_DOMAIN
//     }
// };

//routes
app.get('/', (req, res) => {
    nav.local = 'home';
    res.render('pages/home', { nav: nav });
});

app.get('/sendmail', (req, res) => {
    nav.local = 'sendMail'
    res.render('pages/sendmail', { nav: nav });
});

app.post('/send/mail', mailValid, async (req, res) => {
    console.log(req.body);
    nav.local = 'sendMail'

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    });

    const options = {
        from: 'zoullata001@gmail.com',
        to : req.body.send_to,
        subject: req.body.subject,
        text: req.body.message
    };

    try{
        const send = await transporter.sendMail(options);
        if(!send) throw Error ("send mail failed !");
        res.status(200).redirect('/sendmail');
    } catch(err){
        res.status(500).json({message: err});
    }
});

app.listen( PORT, () => console.log(`server running on: \nhttp://localhost:${PORT}`));