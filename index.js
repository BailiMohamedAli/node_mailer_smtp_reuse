const express = require("express");
const app = express();
const path = require("path");

const PORT = 3001;
//data utilities
const {nav} = require("./routes/data")


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    nav.local = 'home';
    res.render('pages/home', { nav: nav });
});

app.get('/sendmail', (req, res) => {
    nav.local = 'sendMail'
    res.render('pages/sendmail', { nav: nav });
})
app.post('/send/mail', (req, res) => {
    console.log(req.body);
    nav.local = 'sendMail'
    res.redirect('/sendmail');
})

app.listen( PORT, () => console.log(`server running on: \nhttp://localhost:${PORT}`));