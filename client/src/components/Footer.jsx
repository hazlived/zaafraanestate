import React, { useState } from 'react';
import { Flower2, Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer>
      <div className="page-shell">
        <div className="footer-grid">
          <div>
            <div className="brand-mark">
              <div className="brand-logo" aria-hidden="true">
                <Flower2 size={22} />
              </div>
              <div className="brand-text">
                <span className="brand-name">Zaafraan Estate</span>
                <span className="brand-tagline">Pampore · Kashmir</span>
              </div>
            </div>
            <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', maxWidth: '30rem' }}>
              A seasonal estate bringing authentic GI Tagged Kashmiri Mongra saffron directly from Pampore Karewas to your kitchen.
            </p>
            <p className="footer-meta">
              Registered in Srinagar · GI Tag Registration No. 635 · FSSAI Compliant · Contact: hello@zaafraanestate.com
            </p>
          </div>

          <div>
            <p className="section-label">Stay in season</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Receive one quiet email when the next saffron harvest opens, along with authentic recipes from Kashmiri kitchens.
            </p>

            {subscribed ? (
              <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} />
                <span>You're on the harvest list. Welcome.</span>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Join Harvest List
                </button>
              </form>
            )}
          </div>
        </div>

        <div style={{ paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
          <div>&copy; {new Date().getFullYear()} Zaafraan Estate. All rights reserved.</div>
          <div>ISO 3632-1 Grade I Certified · Pampore Karewas</div>
        </div>
      </div>
    </footer>
  );
};
