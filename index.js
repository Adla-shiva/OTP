const express = require('express');
const { createClient } = require('redis');
const { transporter } = require('./mail');
const {cookparser} = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookparser());

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redisClient = createClient({ url: REDIS_URL });
redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function start() {
    await redisClient.connect();

    app.get('/', (req, res) => res.json({ status: 'ok' }));
    app.post('/send-otp', async (req, res) => {
        const { useremail } = req.body;
    
        if (!useremail) {
            return res.status(400).json({ error: 'useremail is required' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await redisClient.setEx(useremail, 60, otp); // OTP valid for 1 minutes

        res.setCookie('email', useremail, { httpOnly: true, maxAge: 300000 });
        
        // Send OTP via email
        var options = {
        to: useremail,
        subject: "Testing node emails",
        html: `<h1>Heloo welcome to our appplication</h1>
        <p>Your OTP is: <b>${otp}</b></p>
    `,


        };

        transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error)
            }
            else {
                console.log("sent ")
            }

        }
    

    );
        res.json({ message: 'OTP sent to email' });
    });
    app.post('/verify-otp', async (req, res) => {
        const {otp } = req.body;  
        const useremail = req.cookies['email'];
         
        if (!useremail || !otp) {
            return res.status(400).json({ error: 'useremail and otp are required' });
        }       
        const storedOtp = await redisClient.get(useremail);
        if (storedOtp === otp) {
            await redisClient.del(useremail);   
            return res.json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid OTP' });
        }       
    });
    const server = app.listen(PORT, () => {
        console.log(`Express listening on http://localhost:${PORT}`);
    });

    const shutdown = async () => {
        console.log('Shutting down...');
        await redisClient.quit().catch(() => {});
        server.close(() => process.exit(0));
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

start().catch((err) => {
    console.error('Failed to start', err);
    process.exit(1);
});