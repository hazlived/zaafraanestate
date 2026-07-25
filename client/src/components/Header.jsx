import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, Flower2, ArrowRight } from 'lucide-react';

export const Header = () => {
  const { totalItemsCount, openDrawer } = useCart();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/story', label: 'Heritage & Craft' },
    { path: '/shop', label: 'Harvest Shop' },
    { path: '/rituals', label: 'Infusion & Recipes' },
    { path: '/quality', label: 'Authenticity & Lab' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header>
      <div className="page-shell nav-bar">
        <Link to="/" className="brand-mark">
          <div className="brand-logo" aria-hidden="true">
            <Flower2 size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Zaafraan Estate</span>
            <span className="brand-tagline">GI Tagged Kashmiri Mongra · Pampore</span>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="tray-pill-btn" onClick={openDrawer} aria-label="Open cart tray">
            <ShoppingBag size={16} />
            <span>Tray</span>
            <span className="tray-count-badge">{totalItemsCount}</span>
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Full-Screen Top Dropdown Mobile Menu mounted directly to document.body via Portal */}
      {mobileNavOpen &&
        ReactDOM.createPortal(
          <div className="mobile-nav-full-overlay">
            <div className="mobile-nav-top-bar">
              <div className="brand-mark">
                <div className="brand-logo" aria-hidden="true">
                  <Flower2 size={24} />
                </div>
                <div className="brand-text">
                  <span className="brand-name">Zaafraan Estate</span>
                  <span className="brand-tagline" style={{ display: 'block' }}>Pampore Karewas</span>
                </div>
              </div>

              <button
                className="mobile-close-circle-btn"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={26} />
              </button>
            </div>

            <div className="mobile-nav-links-wrap">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link-item ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={22} className="mobile-link-arrow" />
                </Link>
              ))}
            </div>

            <div className="mobile-nav-footer">
              <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                Kashmiri Mongra Saffron · Pampore Estate
              </p>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
