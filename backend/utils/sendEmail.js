const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    console.log('=== SENDING EMAIL ===');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // false for 587, true for 465
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Test connection first
    console.log('Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Define email options
    const mailOptions = {
      from: `${process.env.SMTP_FROM_NAME || 'TrackZen'} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message
    };

    console.log('Sending email...');

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);

    return info;
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = sendEmail;
