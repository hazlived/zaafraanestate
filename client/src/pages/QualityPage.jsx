import React from 'react';
import { BatchChecker } from '../components/BatchChecker';
import { ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';

export const QualityPage = () => {
  return (
    <main className="page-shell">
      <section style={{ padding: 'var(--space-10) 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto var(--space-10)' }}>
          <p className="section-label">ISO 3632-1 & IIKSTC Standards</p>
          <h1>Authenticity & Lab Ratings</h1>
          <p className="lead" style={{ margin: 'var(--space-4) auto 0' }}>
            Zaafraan Estate saffron undergoes spectrophotometric chemical analysis at NABL accredited labs in Pampore to ensure 100% purity with zero artificial adulterants.
          </p>
        </div>

        {/* Batch Checker Tool */}
        <BatchChecker />

        {/* Standards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', margin: 'var(--space-10) 0' }}>
          <div className="story-card">
            <span style={{ fontSize: '1.4rem' }}>Crocin Index &ge; 250</span>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Crocin determines the water-soluble coloring power. ISO Category I requires a minimum of 200; Zaafraan Mongra consistently rates between 250 and 280+.
            </p>
          </div>

          <div className="story-card">
            <span style={{ fontSize: '1.4rem' }}>Safranal 20–50</span>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Safranal is the volatile essential oil responsible for saffron's warm floral aroma. Pre-dawn hand plucking prevents solar degradation of safranal.
            </p>
          </div>

          <div className="story-card">
            <span style={{ fontSize: '1.4rem' }}>Picrocrocin &ge; 70</span>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Picrocrocin provides the signature bitter-sweet flavor profile. High picrocrocin ensures culinary authenticity in dishes.
            </p>
          </div>
        </div>

        {/* IIKSTC Facility Overview */}
        <div style={{ background: 'var(--color-surface)', border: 'var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            <Award size={28} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>IIKSTC Dusoo Testing Protocol</h3>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            The India International Kashmir Saffron Trading Centre (IIKSTC) in Dusoo, Pampore operates an advanced NABL-accredited testing and processing facility. Each harvest lot undergoes testing for floral waste ratio, moisture retention, heavy metals, and UV spectrophotometry prior to GI Tag certification sealing.
          </p>
        </div>
      </section>
    </main>
  );
};
