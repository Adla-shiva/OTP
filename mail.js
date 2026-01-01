var nm = require('nodemailer');
var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'adlashiva754@gmail.com',
            pass: 'uwxe wtgl sbxq lvkc'
        }
    }
);



exports.transporter = transporter;