import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   host: 'smtp.example.com', // Remplacez par votre serveur SMTP.
   port: 587,
   secure: false,
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASSWORD,
   },
});

export default transporter;
