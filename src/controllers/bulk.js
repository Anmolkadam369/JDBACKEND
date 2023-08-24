

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
            
            "vinuthkumar2003@gmail.com",
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


// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'IMAP', // You can use other services like 'Gmail', 'Outlook', etc.
  auth: {
      user: 'enquiries@aecci.org.in', // Sender's email address
      pass: 'enquiries@320**', // Sender's email password
    },
});

const nothing = async ( req,res)=>{
// Email content
const mailOptions = {
  from: 'enquiries@aecci.org.in', // Sender's email address
  to: 'developeraecci@gmail.com', // Receiver's email address
  subject: 'Test Email',
  text: 'This is a test email sent from Node.js using nodemailer.',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message);
    res.send({message:"error brooooooo",error:error.message})
  } else {
    console.log('Email sent:', info.response);
    res.send({message:"send email brooooo"});
  }
});


}


const stripe = require('stripe')('sk_test_51NeDlSSE6HEkoLFXW8USiOUxFOmI28emB3UjkNAZBWiy2sF2w3kz3iGZzsrVWQNBiqn9ZbxScWbsjPsZy1ZlM3Wx00zDVZKaSZ');


const payment = async (req, res) => {
  try {
      console.log("some")
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
    });
    console.log(paymentIntent.client_secret)
    res.status(200).send({ data: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports ={payment, sendingMailToUser,nothing}