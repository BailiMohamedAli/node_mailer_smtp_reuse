const emailCheck = require('email-check');

function mailValid(req, res, next) {
    emailCheck(req.body.send_to)
    .then(res => next())
    .catch(err => res.status(400).json({message: false}));
};

module.exports.mailValid = mailValid;