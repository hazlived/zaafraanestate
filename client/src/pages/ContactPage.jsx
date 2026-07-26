import React, { useState } from 'react';
import { submitContactInquiry } from '../services/api';
import { Mail, Phone, PhoneCall, Send, CheckCircle2, AlertCircle, XCircle, ExternalLink } from 'lucide-react';

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

  const phoneNumbers = [
    { number: '+91 70068 98734', raw: '+917006898734' },
    { number: '+91 60051 64728', raw: '+916005164728' },
    { number: '+91 87159 13004', raw: '+918715913004' }
  ];

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
          {/* Contact Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Email Inquiries */}
            <div className="story-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
                <Mail size={24} />
                <strong style={{ color: '#fff', fontSize: '1.2rem' }}>Email Inquiries</strong>
              </div>

              <a
                href="mailto:haziqzargar41@gmail.com"
                className="contact-email-action-btn"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={20} />
                  <span style={{ fontWeight: 600 }}>Send Direct Email</span>
                </div>
                <ExternalLink size={16} style={{ opacity: 0.8 }} />
              </a>
            </div>

            {/* Phone Concierge Desk */}
            <div className="story-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                <Phone size={24} />
                <strong style={{ color: '#fff', fontSize: '1.2rem' }}>Concierge Desk</strong>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: 'var(--space-5)' }}>
                Mon – Sat: 9:00 AM – 6:00 PM IST
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {phoneNumbers.map((phone, idx) => (
                  <div key={idx} className="phone-contact-row">
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#f5f5f7' }}>{phone.number}</span>
                    <a href={`tel:${phone.raw}`} className="contact-call-action-btn">
                      <PhoneCall size={15} /> Call Now
                    </a>
                  </div>
                ))}
              </div>
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
                    <span style={{ display: 'block', marginTop: '4px', fontSize: '0.8rem', opacity: 0.85 }}>
                      Ref Code: #{status.refId}
                    </span>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Rahul Sharma"
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
                    placeholder="ahmad@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label>Inquiry Nature</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
                    <option value="Personal Harvest Order">Personal Harvest Order</option>
                    <option value="Wholesale & Restaurant Supply">Wholesale & Restaurant Supply</option>
                    <option value="International Export">International Export / B2B</option>
                    <option value="Authenticity & Testing Inquiry">Authenticity & Testing Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. 50g Wholesale Order"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your requirements, required quantity, or delivery location..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary" type="submit" disabled={loading} style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}>
                <Send size={16} /> {loading ? 'Transmitting Inquiry...' : 'Transmit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
