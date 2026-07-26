import React from 'react';
import { ShieldCheck, SunDim, Snowflake, Clock, Box } from 'lucide-react';

export const SaffronStorageGuide = () => {
  const rules = [
    {
      num: '01',
      title: 'Airtight Glass or Brass Tins',
      desc: 'Always store stigmas sealed in airtight brass tins or dark amber glass. Plastic containers absorb volatile terpenes.',
      icon: <Box size={22} color="var(--color-primary)" />
    },
    {
      num: '02',
      title: 'Cool, Dark Pantry Storage',
      desc: 'Keep in a dark cupboard away from direct sunlight, stove heat, and microwave proximity to preserve safranal essential oil.',
      icon: <SunDim size={22} color="var(--color-primary)" />
    },
    {
      num: '03',
      title: 'Avoid Refrigeration & Moisture',
      desc: 'Never store saffron in the fridge. Temperature fluctuations create condensation when opened, causing delicate stigmas to spoil.',
      icon: <Snowflake size={22} color="var(--color-primary)" />
    },
    {
      num: '04',
      title: '3-Year Peak Shelf Life',
      desc: 'When stored properly in sealed brass tins, Grade I Mongra saffron retains 100% crocin color power and aroma for up to 3 years.',
      icon: <Clock size={22} color="var(--color-primary)" />
    }
  ];

  return (
    <section className="storage-guide-wrap">
      <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto var(--space-8)' }}>
        <p className="section-label">Preservation & Care</p>
        <h2 className="section-title">Storage & Shelf-Life Guide</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Follow these 4 simple guidelines to keep your Zaafraan Mongra threads potent and aromatic for years.
        </p>
      </div>

      <div className="storage-cards-grid">
        {rules.map((rule) => (
          <div key={rule.num} className="storage-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <div className="storage-icon-wrap">
                {rule.icon}
              </div>
              <span className="storage-rule-num">RULE {rule.num}</span>
            </div>
            <h3 className="storage-card-title">{rule.title}</h3>
            <p className="storage-card-text">{rule.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
