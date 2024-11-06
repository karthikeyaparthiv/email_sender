const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    // Nodemailer configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'pparthiv.human@gmail.com', 
            pass: 'pkylajqamigpesyh' 
        }
    });

    const mailOptions = {
        from: 'pparthiv.human@gmail.com', 
        to: 'pparthiv.human@gmail.com', 
        replyTo: email, 
        subject: `New message from ${email}`,
        text: `Email: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(5000);
