var nm = require('nodemailer');
var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'example@gmail.com',
            pass: 'password'
        }
    }
);



exports.transporter = transporter;