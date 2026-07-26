import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { X, CheckCircle2, ShieldCheck, QrCode, Upload, Copy, Check, AlertCircle, Send, Truck, ChevronDown, ChevronUp } from 'lucide-react';

export const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, items, subtotal, autoDiscountAmount, discountAmount, shippingFee, grandTotal, clearCart } = useCart();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const paymentOptions = {
    upi: {
      title: 'UPI Payment (GPay / PhonePe / Paytm)',
      subText: 'Instant Verification via QR Code / VPA ID'
    },
    cod: {
      title: 'Cash On Delivery (COD)',
      subText: 'Pay upon delivery'
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPaymentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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
    navigator.clipboard.writeText('haziqzargar42-1@okhdfcbank');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.paymentMethod === 'upi') {
      if (!formData.upiTxnId.trim()) {
        setErrorMessage('Please enter your 12-digit UPI Transaction / UTR ID.');
        return;
      }
      if (!formData.upiScreenshotDataUrl) {
        setErrorMessage('Please attach your payment receipt screenshot to complete the order.');
        return;
      }
    }

    setLoading(true);

    const payload = {
      ...formData,
      items: Object.values(items),
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

  const currentPayment = paymentOptions[formData.paymentMethod] || paymentOptions.upi;

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
                  <input type="text" name="name" required placeholder="Ahmad Zargar" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number (WhatsApp) *</label>
                  <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address (For Order Receipts) *</label>
                <input type="email" name="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Shipping Street Address *</label>
                <textarea name="address" rows={2} required placeholder="House No, Street, Landmark..." value={formData.address} onChange={handleChange} />
              </div>

              <div className="modal-grid-2col">
                <div className="form-group">
                  <label>City / Town *</label>
                  <input type="text" name="city" required placeholder="Srinagar / New Delhi" value={formData.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input type="text" name="pincode" required placeholder="190001" value={formData.pincode} onChange={handleChange} />
                </div>
              </div>

              {/* Payment Method Selection (Custom Luxury Theme Dropdown) */}
              <div className="form-group">
                <label>Payment Method *</label>
                <div className={`custom-dropdown-wrap ${paymentDropdownOpen ? 'is-open' : ''}`} ref={dropdownRef}>
                  <button
                    type="button"
                    className="custom-dropdown-trigger"
                    onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
                    aria-expanded={paymentDropdownOpen}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{currentPayment.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{currentPayment.subText}</span>
                    </div>
                    {paymentDropdownOpen ? <ChevronUp size={20} color="var(--color-primary)" /> : <ChevronDown size={20} color="var(--color-primary)" />}
                  </button>

                  {paymentDropdownOpen && (
                    <div className="custom-dropdown-menu">
                      {Object.keys(paymentOptions).map((key) => {
                        const opt = paymentOptions[key];
                        const isSelected = formData.paymentMethod === key;
                        return (
                          <div
                            key={key}
                            className={`custom-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, paymentMethod: key }));
                              setPaymentDropdownOpen(false);
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: isSelected ? '700' : '500' }}>{opt.title}</span>
                              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{opt.subText}</span>
                            </div>
                            {isSelected && <Check size={16} color="var(--color-primary)" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
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
                      <div className="upi-vpa-text">haziqzargar42-1@okhdfcbank</div>
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

                  {/* UPI QR Code Container */}
                  <div style={{ textAlign: 'center', margin: 'var(--space-3) 0', padding: '12px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)', boxShadow: '0 0 20px rgba(243, 194, 122, 0.25)' }}>
                    <img
                      src="/images/upi-qr.png"
                      alt="Scan to Pay via GPay / PhonePe / Paytm"
                      style={{ width: '190px', height: '190px', objectFit: 'contain', display: 'block', margin: '0 auto', borderRadius: '4px' }}
                    />
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0b0f14', marginTop: '8px' }}>
                      Scan QR Code to Pay ₹{grandTotal.toLocaleString()}
                    </div>
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
                    <label>Upload Payment Screenshot *</label>
                    <div className="upi-file-dropzone">
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                      />
                      <div className="dropzone-label">
                        <Upload size={18} color="var(--color-primary)" />
                        <span>{formData.upiScreenshotName ? `Attached: ${formData.upiScreenshotName}` : 'Click to attach payment receipt screenshot *'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Total Overview */}
              <div className="checkout-summary-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                    <span>Total Discount:</span>
                    <span>- ₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  <span>Shipping Fee:</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-primary)' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '1.2rem', fontWeight: 700, paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>Total Amount Payable:</span>
                  <span style={{ color: 'var(--color-primary)' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {autoDiscountAmount > 0 ? (
                <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', background: 'rgba(243, 194, 122, 0.08)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(243, 194, 122, 0.2)', textAlign: 'center' }}>
                  ✨ Automatic ₹375 Reserve Discount applied (orders above ₹5,000)
                </div>
              ) : subtotal > 0 && subtotal <= 5000 ? (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  💡 Add <strong style={{ color: 'var(--color-primary)' }}>₹{(5000 - subtotal).toLocaleString()}</strong> more to get an automatic <strong style={{ color: 'var(--color-primary)' }}>₹375 off</strong>!
                </div>
              ) : null}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: 'var(--space-2)' }}
              >
                {loading ? 'Processing Order Submission...' : `Confirm Order (₹${grandTotal.toLocaleString()})`}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: 'var(--space-2)' }}>Order Received</h2>
            <p className="section-label" style={{ fontSize: '0.85rem' }}>Reference: #{orderId}</p>

            <p style={{ color: 'var(--color-text-muted)', maxWidth: '28rem', margin: 'var(--space-4) auto var(--space-6)', lineHeight: '1.6' }}>
              Thank you for ordering with Zaafraan Estate. Your order details have been dispatched to our Kashmir desk. A confirmation receipt has been sent to <strong>{formData.email}</strong>.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', textAlign: 'left', maxWidth: '28rem', margin: '0 auto var(--space-6)', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Payment Method:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{formData.paymentMethod === 'upi' ? 'UPI Transfer' : 'Cash On Delivery'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Amount Payable:</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={closeCheckout}>
              Done & Return to Estate
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
