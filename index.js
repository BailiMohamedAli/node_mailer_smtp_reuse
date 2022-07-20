const express = require("express");
const app = express();
const path = require("path");
//mailer config
const nodemailer = require('nodemailer');
//mail validator middleware
const {mailValid} = require('./routes/middleware/emailverify');
require('dotenv').config();
const {google} = require('googleapis');

const PORT = 3001;
//data utilities
const {nav} = require("./routes/data")


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => {
    nav.local = 'home';
    res.render('pages/home', { nav: nav });
});

app.get('/sendmail', (req, res) => {
    nav.local = 'sendMail'
    res.render('pages/sendmail', { nav: nav });
});

// 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const emailSmtp = process.env.EMAILSMTP;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

app.post('/send/mail', mailValid, async (req, res) => {
    console.log(req.body);
    nav.local = 'sendMail'
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: emailSmtp,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        },
    });

    const options = {
        from: emailSmtp,
        to : req.body.send_to,
        subject: req.body.subject,
        text: req.body.message,
        html: `<h3>${req.body.message}</h3>`
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