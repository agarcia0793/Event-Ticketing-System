import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.log('SMTP Error:', error);
    } else {
      console.log('SMTP server is ready to send emails');
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"Event Ticketing" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Email sending failed:', err);
  }
};
