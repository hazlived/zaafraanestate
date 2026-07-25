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
    // { path: '/quality', label: 'Authenticity & Lab' },
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
            <span className="brand-tagline">100% Pure Kashmiri Mongra · Pampore</span>
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

        {/* Full-Screen Top Dropdown Mobile Menu Portal */}
        {mobileNavOpen &&
          ReactDOM.createPortal(
            <div className="mobile-nav-full-overlay" onClick={() => setMobileNavOpen(false)}>
              <div className="mobile-nav-top-bar" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Flower2 size={28} color="var(--color-primary)" />
                  <span className="brand-name" style={{ fontSize: '1.4rem' }}>Zaafraan Estate</span>
                </div>
                <button
                  className="mobile-close-circle-btn"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={26} />
                </button>
              </div>

              <div className="mobile-nav-links-wrap" onClick={(e) => e.stopPropagation()}>
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

              <div className="mobile-nav-footer" onClick={(e) => e.stopPropagation()}>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Harvested in Pampore, Kashmir · 100% Pure Saffron
                </p>
              </div>
            </div>,
            document.body
          )}
      </div>
    </header>
  );
};
