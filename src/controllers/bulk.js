

const nodemailer = require('nodemailer');

 const sendingMailToUser = async (req, res) => {
    // Create a transporter using SMTP transport

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'anmolkadam369@gmail.com',
                pass: 'xapeupenirhdxtgt'
            }
        });

        const recipients = [
            
            "rkrkaksk999@gmail.com",
            // "vinuthkumar2003@gmail.com",
            "developeraecci@gmail.com",
        ];

        // Email message template
        const message = {
            from: 'anmolkadam369@gmail.com',
            subject: 'some111111',
            text: 'This is a test email sent to multiple recipients.',
        };

        // Send emails to all recipients
        recipients.forEach(async (recipient) => {
            try {
                const info = await transporter.sendMail({ ...message, to: recipient });
                console.log(`Email sent to ${recipient}: ${info.response}`);
            } catch (error) {
                console.error(`Error sending email to ${recipient}:`, error);
            }
        });
    }
    catch (error) {
        console.log('Error sending email:', error);
        res.status(500).send({ status: false, message: error.message })

    }
}

module.exports ={sendingMailToUser}