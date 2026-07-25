import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { X, CheckCircle2, ShieldCheck, QrCode, Upload, Copy, Check, AlertCircle, Send, Truck } from 'lucide-react';

export const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, items, subtotal, discountAmount, shippingFee, grandTotal, clearCart } = useCart();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi',
    upiTxnId: '',
    upiScreenshotName: '',
    upiScreenshotDataUrl: ''
  });

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        upiScreenshotName: file.name
      }));

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setFormData((prev) => ({
            ...prev,
            upiScreenshotDataUrl: compressedDataUrl
          }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('zaafraanestate@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.paymentMethod === 'upi' && !formData.upiTxnId) {
      setErrorMessage('Please enter your UPI Transaction ID / UTR number.');
      return;
    }

    setLoading(true);

    const itemList = Object.values(items).map((item) => ({
      id: item.id,
      title: item.title,
      qty: item.qty,
      price: item.price,
      gram: item.gram
    }));

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      upiTxnId: formData.upiTxnId,
      upiScreenshotDataUrl: formData.upiScreenshotDataUrl,
      items: itemList,
      subtotal,
      discountAmount,
      shippingFee,
      grandTotal
    };

    const res = await submitOrder(payload);
    setLoading(false);

    if (res && res.success) {
      setOrderId(res.orderId || 'ZE-ORD-' + Math.floor(100000 + Math.random() * 900000));
      setStep('success');
      clearCart();
    } else {
      setErrorMessage(res ? res.message : 'Order transmission failed. Please try again.');
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeCheckout}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn modal-close-btn" onClick={closeCheckout} aria-label="Close checkout">
          <X size={22} />
        </button>

        {step === 'form' ? (
          <div>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <p className="section-label">Zaafraan Direct Delivery</p>
              <h3 className="modal-title">Checkout & Harvest Shipping</h3>
            </div>

            {errorMessage && (
              <div className="modal-error-alert">
                <AlertCircle size={20} color="var(--color-saffron-red)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-saffron-red)' }}>Order Not Submitted</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="modal-grid-2col">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" required placeholder="Ahmad Shah" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" required placeholder="ahmad@example.com" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="modal-grid-2col">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" required placeholder="190001" value={formData.pincode} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Shipping Street Address *</label>
                <textarea name="address" rows={2} required placeholder="House No, Street, Landmark..." value={formData.address} onChange={handleChange} />
              </div>

              {/* Payment Method Selection */}
              <div className="form-group">
                <label>Payment Method *</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="upi">UPI Payment (GPay / PhonePe / Paytm)</option>
                  <option value="cod">Cash on Delivery (COD · Pampore Verification)</option>
                </select>
              </div>

              {/* UPI Payment Gateway Module */}
              {formData.paymentMethod === 'upi' && (
                <div className="upi-module-card">
                  <div className="upi-module-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                      <QrCode size={20} />
                      <strong style={{ fontSize: '1rem', color: '#fff' }}>UPI Transfer Details</strong>
                    </div>
                    <span className="meta-pill" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                      Instant Verification
                    </span>
                  </div>

                  <div className="upi-vpa-box">
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>UPI VPA ID</div>
                      <div className="upi-vpa-text">zaafraanestate@upi</div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={copyUpiId}
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                    >
                      {copiedUpi ? <><Check size={14} color="#10b981" /> Copied!</> : <><Copy size={14} /> Copy ID</>}
                    </button>
                  </div>

                  <p className="upi-instruction-text">
                    Transfer ₹<strong>{grandTotal.toLocaleString()}</strong> to the UPI ID above via GPay, PhonePe, or Paytm, then enter your transaction details below.
                  </p>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>UPI Transaction ID / UTR Number *</label>
                    <input
                      type="text"
                      name="upiTxnId"
                      required
                      placeholder="e.g. 429182749102"
                      value={formData.upiTxnId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Upload Payment Screenshot</label>
                    <div className="upi-file-dropzone">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                        <Upload size={18} />
                        <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          {formData.upiScreenshotName ? formData.upiScreenshotName : 'Choose Screenshot Image File'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Total & Submit */}
              <div className="modal-footer-summary">
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Total Payable Amount</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: '700', color: 'var(--color-primary)' }}>₹{grandTotal.toLocaleString()}</div>
                </div>

                <button className="btn btn-primary" type="submit" disabled={loading} style={{ padding: '0.75rem 1.4rem' }}>
                  <Send size={16} /> {loading ? 'Transmitting Order...' : 'Confirm & Dispatch'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-4)',
                border: '1px solid #10b981'
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <h3 style={{ fontSize: '1.85rem', marginBottom: 'var(--space-2)' }}>Harvest Order Confirmed!</h3>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: 'var(--space-4)' }}>
              Your order reference code is <strong style={{ color: 'var(--color-primary)' }}>#{orderId}</strong>.
            </p>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
                fontSize: '0.88rem',
                color: '#e2e8f0',
                textAlign: 'left'
              }}
            >
              <p style={{ margin: '0 0 6px' }}><strong>Dispatch Status:</strong> Order details & payment record transmitted to Pampore Estate.</p>
              <p style={{ margin: 0 }}><strong>Email Receipt:</strong> Confirmation receipt & tracking update will be sent to <span style={{ color: 'var(--color-primary)' }}>{formData.email}</span>.</p>
            </div>

            <button className="btn btn-outline" onClick={closeCheckout}>
              Return to Estate
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
