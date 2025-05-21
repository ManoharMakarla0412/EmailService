const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json()); // ✅ THIS IS CRITICAL

// Add GET route for testing
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Email service is running',
        timestamp: new Date().toISOString()
    });
});

app.post('/sendEmail', async (req, res) => {
    try {
        const { to, subject, body } = req.body;

        if (!to || !subject || !body) {
            return res.status(400).json({ status: 'error', message: 'Missing fields' });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: 'founders@redstring.co.in',
                pass: 'jiXYeBgjP7CZ'
            }
        });

        const mailOptions = {
            from: 'founders@redstring.co.in',
            to,
            subject,
            html: body
        };

        await transporter.sendMail(mailOptions);
        res.json({ status: 'success', message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
