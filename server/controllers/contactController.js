const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const inquiriesMemoryStore = [];

// Default recipient email
const DEFAULT_RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'haziqzargar42@gmail.com';

// Dispatch Email Notification via Resend API (or Nodemailer fallback)
const sendInquiryEmail = async (inquiry) => {
  const recipient = process.env.RECIPIENT_EMAIL || DEFAULT_RECIPIENT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0b0f14; color: #f5f5f7; padding: 28px; border-radius: 10px; border: 1px solid #f3c27a; max-width: 600px; margin: 0 auto;">
      <div style="border-bottom: 1px solid rgba(243, 194, 122, 0.25); padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #f3c27a; font-size: 1.5rem; margin: 0;">Zaafraan Estate · New Web Inquiry</h2>
        <p style="color: #a0aec0; font-size: 0.85rem; margin-top: 4px;">Reference ID: <strong>${inquiry.refId}</strong></p>
      </div>

      <table style="width: 100%; font-size: 0.95rem; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #a0aec0; width: 130px;">Sender Name:</td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${inquiry.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #a0aec0;">Sender Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}" style="color: #f3c27a; text-decoration: none;">${inquiry.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #a0aec0;">Category:</td>
          <td style="padding: 8px 0; color: #f3c27a;">${inquiry.inquiryType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #a0aec0;">Subject:</td>
          <td style="padding: 8px 0; color: #ffffff;">${inquiry.subject}</td>
        </tr>
      </table>

      <div style="background: rgba(255, 255, 255, 0.04); padding: 18px; border-radius: 8px; border-left: 3px solid #f3c27a; margin-bottom: 20px;">
        <h3 style="color: #f3c27a; font-size: 1rem; margin-top: 0; margin-bottom: 8px;">Inquiry Message:</h3>
        <p style="white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6; color: #e2e8f0; margin: 0;">${inquiry.message}</p>
      </div>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; font-size: 0.78rem; color: #718096; text-align: center;">
        Transmitted live from Pampore Estate Portal at ${inquiry.createdAt}
      </div>
    </div>
  `;

  // 1. Resend API Mode
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const fromAddress = process.env.RESEND_FROM || 'Zaafraan Estate <onboarding@resend.dev>';
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipient],
      replyTo: inquiry.email,
      subject: `[Zaafraan Inquiry ${inquiry.refId}] ${inquiry.subject}`,
      html: htmlContent
    });

    if (error) {
      console.error('[ERROR] Resend API dispatch failed:', error);
      throw new Error(error.message || 'Resend API transmission failed');
    }

    console.log(`[OK] Resend API email delivered to ${recipient} (ID: ${data.id})`);
    return data;
  }

  // 2. SMTP / Nodemailer Mode
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"Zaafraan Estate Web" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: inquiry.email,
      subject: `[Zaafraan Inquiry ${inquiry.refId}] ${inquiry.subject}`,
      html: htmlContent
    });
    console.log(`[OK] SMTP email delivered to ${recipient}`);
    return;
  }

  // 3. Error if no Resend API key or SMTP config present
  throw new Error('Resend API key missing. Please set RESEND_API_KEY in server/.env');
};

// POST /api/contact
const handleContactSubmit = async (req, res) => {
  try {
    const { fullName, email, inquiryType, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Full Name, Email, Subject, Message).'
      });
    }

    const refId = 'ZE-INQ-' + Math.floor(100000 + Math.random() * 900000);
    const newInquiry = {
      refId,
      fullName: fullName.trim(),
      email: email.trim(),
      inquiryType: inquiryType || 'General Inquiry',
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    // Attempt live email dispatch
    try {
      await sendInquiryEmail(newInquiry);
      inquiriesMemoryStore.push(newInquiry);

      res.status(201).json({
        success: true,
        message: 'Thank you. Your inquiry has been transmitted successfully to Zaafraan Estate Concierge.',
        refId,
        inquiry: newInquiry
      });
    } catch (mailErr) {
      console.error('[ERROR] Mail dispatch failed:', mailErr.message);
      res.status(500).json({
        success: false,
        message: `Message not delivered. ${mailErr.message}`
      });
    }
  } catch (error) {
    console.error('[ERROR] Contact submission failed:', error);
    res.status(500).json({
      success: false,
      message: 'Message not delivered. An internal server error occurred.'
    });
  }
};

module.exports = {
  handleContactSubmit
};
