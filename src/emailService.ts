import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(body: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Only for testing purpose, for real apps u need certificates
    },
  });

  const mailOptions = {
    from: `"Weather Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'San Francisco Weather Report - 2022-11',
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent : ${info.response}`);
  } catch (err: any) {
    console.error(`Failed to send email: ${err.message}`);
  }
}

// Simple email test function
export async function simpleEmailTest() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }, 
      tls: {
          rejectUnauthorized: false, // Only for testing purpose, for real apps u need certificates
        },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Test Email',
      text: 'This is a test email'
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (err: any) {
      console.error(`Failed to send email: ${err.message}`);
    }
  };
