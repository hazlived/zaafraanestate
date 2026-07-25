import React from 'react';
import { Link } from 'react-router-dom';

/* 
  Authenticity & Lab Ratings page commented out as requested.
*/
export const QualityPage = () => {
  return (
    <main className="page-shell">
      <section style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <p className="section-label">Zaafraan Harvest</p>
        <h1 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-4)' }}>100% Pure Kashmiri Mongra Saffron</h1>
        <p className="lead" style={{ margin: '0 auto var(--space-8)' }}>
          Our harvest features 100% all-red Category I Mongra stigmas harvested directly from Pampore Karewa soils.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore Harvest Tins
        </Link>
      </section>
    </main>
  );
};
