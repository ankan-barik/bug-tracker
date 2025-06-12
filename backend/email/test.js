require('dotenv').config();

const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('=== EMAIL CONFIGURATION TEST ===');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL);
  console.log('SMTP_PASSWORD length:', process.env.SMTP_PASSWORD?.length);
  
  try {
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'ankanbarik2004@gmail.com',
        pass: 'hayq kfiw kaja vanv'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Testing connection...');
    await transporter.verify();
    console.log('✅ Connection successful!');

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: 'Bug Tracker Pro <ankanbarik2004@gmail.com>',
      to: 'ankanbarik2004@gmail.com',
      subject: 'Test Email',
      html: '<h1>Test successful!</h1><p>Email configuration is working.</p>'
    });

    console.log('✅ Email sent!', info.messageId);
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testEmail();
