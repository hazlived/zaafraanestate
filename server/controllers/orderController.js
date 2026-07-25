const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const ordersMemoryStore = [];

// Default recipient email
const DEFAULT_RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'haziqzargar42@gmail.com';

// Dispatch NEW ORDER Email via Resend (or Nodemailer fallback)
const sendOrderNotificationEmail = async (orderData) => {
  const recipient = process.env.RECIPIENT_EMAIL || DEFAULT_RECIPIENT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  // Format Itemized List HTML
  const itemsHtml = orderData.items
    .map(
      (item) => `
        <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
          <td style="padding: 10px 0; color: #ffffff; font-weight: 600;">${item.title}</td>
          <td style="padding: 10px 0; color: #f3c27a; text-align: center;">${item.qty}x</td>
          <td style="padding: 10px 0; color: #a0aec0; text-align: center;">${item.gram || 'Grade I'}</td>
          <td style="padding: 10px 0; color: #ffffff; text-align: right; font-weight: 700;">₹${(item.price * item.qty).toLocaleString()}</td>
        </tr>
      `
    )
    .join('');

  const isUPI = orderData.paymentMethod === 'upi';

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0b0f14; color: #f5f5f7; padding: 28px; border-radius: 12px; border: 2px solid #f3c27a; max-width: 650px; margin: 0 auto;">
      
      <!-- Header Banner -->
      <div style="border-bottom: 2px solid rgba(243, 194, 122, 0.3); padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="color: #f3c27a; font-size: 1.6rem; margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">🛍️ NEW ORDER RECEIVED</h1>
          <p style="color: #a0aec0; font-size: 0.9rem; margin-top: 4px;">Order Ref: <strong style="color: #ffffff;">#${orderData.orderId}</strong></p>
        </div>
        <div style="background: rgba(243, 194, 122, 0.15); border: 1px solid #f3c27a; color: #f3c27a; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">
          ₹${orderData.grandTotal.toLocaleString()}
        </div>
      </div>

      <!-- Customer & Shipping Section -->
      <div style="background: rgba(255, 255, 255, 0.03); padding: 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 20px;">
        <h3 style="color: #f3c27a; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid rgba(243, 194, 122, 0.2); padding-bottom: 6px;">
          📋 Customer Shipping Details
        </h3>
        <table style="width: 100%; font-size: 0.92rem; border-collapse: collapse;">
          <tr>
            <td style="padding: 5px 0; color: #a0aec0; width: 140px;">Customer Name:</td>
            <td style="padding: 5px 0; color: #ffffff; font-weight: 600;">${orderData.name}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #a0aec0;">Email Address:</td>
            <td style="padding: 5px 0;"><a href="mailto:${orderData.email}" style="color: #f3c27a; text-decoration: none;">${orderData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #a0aec0;">Phone Number:</td>
            <td style="padding: 5px 0; color: #ffffff; font-weight: 600;">${orderData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #a0aec0;">Shipping Address:</td>
            <td style="padding: 5px 0; color: #e2e8f0;">${orderData.address}, ${orderData.city ? orderData.city + ', ' : ''}PIN: ${orderData.pincode}</td>
          </tr>
        </table>
      </div>

      <!-- Payment Information -->
      <div style="background: ${isUPI ? 'rgba(16, 185, 129, 0.08)' : 'rgba(243, 194, 122, 0.08)'}; padding: 16px; border-radius: 8px; border: 1px solid ${isUPI ? '#10b981' : '#f3c27a'}; margin-bottom: 20px;">
        <h3 style="color: ${isUPI ? '#10b981' : '#f3c27a'}; font-size: 1.05rem; margin-top: 0; margin-bottom: 10px;">
          💳 Payment Method: ${isUPI ? 'UPI Payment' : 'Cash on Delivery (COD)'}
        </h3>
        ${
          isUPI
            ? `
          <p style="margin: 4px 0; font-size: 0.92rem;"><strong>UPI Transaction ID / UTR:</strong> <span style="color: #10b981; font-weight: 700; font-size: 1rem;">${orderData.upiTxnId || 'Provided'}</span></p>
          ${orderData.upiScreenshotDataUrl ? `<p style="margin: 4px 0; font-size: 0.85rem; color: #a0aec0;">📸 Payment Screenshot Attached by Customer.</p>` : ''}
        `
            : `<p style="margin: 4px 0; font-size: 0.9rem; color: #e2e8f0;">Customer selected Cash on Delivery. Collect ₹${orderData.grandTotal.toLocaleString()} upon package delivery.</p>`
        }
      </div>

      <!-- Itemized Order Table -->
      <div style="margin-bottom: 20px;">
        <h3 style="color: #f3c27a; font-size: 1.05rem; margin-bottom: 10px;">📦 Ordered Saffron Items</h3>
        <table style="width: 100%; font-size: 0.9rem; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(243, 194, 122, 0.3); color: #a0aec0; text-align: left;">
              <th style="padding-bottom: 8px;">Item Description</th>
              <th style="padding-bottom: 8px; text-align: center;">Qty</th>
              <th style="padding-bottom: 8px; text-align: center;">Weight</th>
              <th style="padding-bottom: 8px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <!-- Financial Summary -->
      <div style="background: rgba(255, 255, 255, 0.03); padding: 16px; border-radius: 8px; font-size: 0.92rem; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: #a0aec0;">
          <span>Subtotal:</span>
          <span style="color: #ffffff;">₹${(orderData.subtotal || 0).toLocaleString()}</span>
        </div>
        ${
          orderData.discountAmount > 0
            ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: #f3c27a;">
            <span>Discount Applied:</span>
            <span>- ₹${orderData.discountAmount.toLocaleString()}</span>
          </div>
        `
            : ''
        }
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #a0aec0;">
          <span>Shipping Fee:</span>
          <span style="color: #ffffff;">${orderData.shippingFee === 0 ? 'FREE' : '₹' + orderData.shippingFee}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: #f3c27a; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 10px; margin-top: 6px;">
          <span>Grand Total:</span>
          <span>₹${orderData.grandTotal.toLocaleString()}</span>
        </div>
      </div>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; font-size: 0.78rem; color: #718096; text-align: center;">
        Zaafraan Estate Dispatch Desk · Order Date: ${orderData.createdAt}
      </div>
    </div>
  `;

  // 1. Resend API Mode
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const fromAddress = process.env.RESEND_FROM || 'Zaafraan Estate Orders <onboarding@resend.dev>';
    
    // Prepare email payload with optional screenshot attachment if provided as Data URL
    const emailPayload = {
      from: fromAddress,
      to: [recipient],
      replyTo: orderData.email,
      subject: `NEW ORDER #${orderData.orderId} - ₹${orderData.grandTotal.toLocaleString()} (${orderData.name})`,
      html: htmlContent
    };

    if (orderData.upiScreenshotDataUrl && orderData.upiScreenshotDataUrl.startsWith('data:image/')) {
      const base64Data = orderData.upiScreenshotDataUrl.split(',')[1];
      if (base64Data) {
        emailPayload.attachments = [
          {
            filename: `upi-screenshot-${orderData.orderId}.jpg`,
            content: base64Data
          }
        ];
      }
    }

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('[ERROR] Resend Order Email failed:', error);
      throw new Error(error.message || 'Resend order email transmission failed');
    }

    console.log(`[OK] NEW ORDER email dispatched to ${recipient} (Ref: #${orderData.orderId}, ID: ${data.id})`);
    return data;
  }

  // 2. Nodemailer Fallback Mode
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"Zaafraan Estate Orders" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: orderData.email,
      subject: `NEW ORDER #${orderData.orderId} - ₹${orderData.grandTotal.toLocaleString()} (${orderData.name})`,
      html: htmlContent
    });
    console.log(`[OK] NEW ORDER SMTP email dispatched to ${recipient}`);
    return;
  }

  throw new Error('Resend API key missing in server/.env');
};

// POST /api/orders
const handleOrderSubmit = async (req, res) => {
  try {
    const { name, email, phone, address, city, pincode, paymentMethod, upiTxnId, upiScreenshotDataUrl, items, subtotal, discountAmount, shippingFee, grandTotal } = req.body;

    if (!name || !email || !phone || !address || !pincode || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required shipping fields and ensure your tray is not empty.'
      });
    }

    if (paymentMethod === 'upi' && !upiTxnId) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your UPI Transaction ID / UTR number for verification.'
      });
    }

    const orderId = 'ZE-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: (city || '').trim(),
      pincode: pincode.trim(),
      paymentMethod: paymentMethod || 'upi',
      upiTxnId: (upiTxnId || '').trim(),
      upiScreenshotDataUrl: upiScreenshotDataUrl || null,
      items,
      subtotal: subtotal || 0,
      discountAmount: discountAmount || 0,
      shippingFee: shippingFee || 0,
      grandTotal: grandTotal || 0,
      createdAt: new Date().toISOString()
    };

    // Attempt to dispatch NEW ORDER email notification
    try {
      await sendOrderNotificationEmail(newOrder);
      ordersMemoryStore.push(newOrder);

      res.status(201).json({
        success: true,
        message: 'Order confirmed successfully. Email notification sent to Zaafraan Estate.',
        orderId,
        order: newOrder
      });
    } catch (mailErr) {
      console.error('[ERROR] Order email notification failed:', mailErr.message);
      res.status(500).json({
        success: false,
        message: `Order payment / email notification failed: ${mailErr.message}`
      });
    }
  } catch (error) {
    console.error('[ERROR] Order submission failed:', error);
    res.status(500).json({
      success: false,
      message: 'Order processing failed. Please try again.'
    });
  }
};

module.exports = {
  handleOrderSubmit
};
