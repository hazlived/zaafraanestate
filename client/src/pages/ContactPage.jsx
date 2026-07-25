import React, { useState } from 'react';
import { submitContactInquiry } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: 'Personal Harvest Order',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const response = await submitContactInquiry(formData);
    setStatus(response);
    setLoading(false);
    if (response && response.success) {
      setFormData({
        fullName: '',
        email: '',
        inquiryType: 'Personal Harvest Order',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <main className="page-shell">
      <section style={{ padding: 'var(--space-10) 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto var(--space-10)' }}>
          <p className="section-label">Estate Concierge & Wholesale</p>
          <h1>Connect With Zaafraan</h1>
          <p className="lead" style={{ margin: 'var(--space-4) auto 0' }}>
            Have questions regarding harvest availability, wholesale restaurant orders, or international exports? Our team in Pampore is at your service.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="story-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-primary)' }}>
                <MapPin size={22} />
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Estate Address</strong>
              </div>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>
                Zaafraan Estate, Karewa Heights,<br />
                Pampore, District Pulwama,<br />
                Jammu & Kashmir — 192121
              </p>
            </div>

            <div className="story-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-primary)' }}>
                <Mail size={22} />
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Email Inquiries</strong>
              </div>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>
                General: concierge@zaafraanestate.com<br />
                Wholesale & Export: B2B@zaafraanestate.com
              </p>
            </div>

            <div className="story-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-primary)' }}>
                <Phone size={22} />
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Concierge Desk</strong>
              </div>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>
                +91 (01933) 245-890<br />
                Mon – Sat: 9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--color-surface)', border: 'var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: 'var(--space-6)' }}>Send an Inquiry</h3>

            {/* Status Alert Banner / Popup */}
            {status && (
              <div
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-6)',
                  background: status.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(217, 56, 41, 0.15)',
                  border: `1px solid ${status.success ? '#10b981' : 'var(--color-saffron-red)'}`,
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                  boxShadow: status.success ? '0 4px 15px rgba(16, 185, 129, 0.2)' : '0 4px 15px rgba(217, 56, 41, 0.25)'
                }}
              >
                {status.success ? (
                  <CheckCircle2 size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <XCircle size={22} color="var(--color-saffron-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                )}

                <div>
                  <strong style={{ display: 'block', fontSize: '0.98rem', color: status.success ? '#10b981' : 'var(--color-saffron-red)', marginBottom: '2px' }}>
                    {status.success ? 'Inquiry Delivered Successfully' : 'Message Not Delivered'}
                  </strong>
                  <span>{status.message}</span>
                  {status.refId && (
                    <div style={{ marginTop: '6px', fontSize: '0.82rem', color: 'var(--color-primary)' }}>
                      Reference ID: <strong>{status.refId}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Inquiry Category</label>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                  <option value="Personal Harvest Order">Personal Harvest Order</option>
                  <option value="Wholesale / Culinary B2B">Wholesale / Culinary B2B</option>
                  <option value="International Export">International Export</option>
                  <option value="Lab Certificate Inquiry">Lab Certificate Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Inquiry Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we assist your saffron ritual?"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
                <Send size={16} /> {loading ? 'Transmitting...' : 'Transmit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
