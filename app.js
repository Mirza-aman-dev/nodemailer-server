const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Mail options
const mailOptions = {
    from: {
        name: 'This is the sender',
        address: process.env.EMAIL
    },
    to: "reactnative43@gmail.com",  // The recipient email
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
};

// Function to send email
const sendEmail = async (transporter, mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);  // Capture the response here
        console.log('Email sent: ' + info.response);  // Log the response
    }
    catch (error) {
        console.log(error);
    }
};

// POST route to trigger email sending
app.post('/send-email', async (req, res) => {
    try {
        // You can modify the mailOptions here based on the request body if needed
        await sendEmail(transporter, mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
