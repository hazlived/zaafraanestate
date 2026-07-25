import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, MapPin, Sparkles } from 'lucide-react';

export const StoryPage = () => {
  return (
    <main className="page-shell">
      {/* Story Hero */}
      <section className="hero">
        <div className="hero-copy">
          <p className="section-label">Terroir & Botany</p>
          <h1>
            Born of Karewa Clay<br />
            <span className="gradient-text">Centuries of <em>Crocus sativus</em></span>
          </h1>
          <p className="lead">
            Pampore is the historical Saffron Bowl of Kashmir. Situated at 1,580 meters altitude, its lacustrine Pleistocene Karewa soil combined with sub-zero autumn night air creates the world's most potent saffron.
          </p>
          <div className="hero-actions">
            <a href="#craft-timeline" className="btn btn-primary">Explore 4-Step Craft</a>
            <Link to="/quality" className="btn btn-outline">Spectrophotometer Ratings</Link>
          </div>
        </div>

        <div className="story-image-box">
          <img src="/images/pampore_field.png" alt="Pampore saffron crocus fields under mountain dawn" />
        </div>
      </section>

      {/* Terroir & Biochemical Specs */}
      <section style={{ padding: 'var(--space-12) 0', borderTop: 'var(--glass-border)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <p className="section-label">GI Tagged Terroir</p>
          <h2 className="section-title">Why Kashmiri Saffron is Matchless</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Unlike Mediterranean or Iranian crops, Kashmiri <em>Crocus sativus L.</em> features thick, dark maroon stigmas with trumpet flared tips. Nurtured by iron-rich Karewa clay along the Jhelum river basin, it produces the highest natural concentration of Crocin pigment globally.
          </p>
        </div>

        <div className="story-cards-wrapper">
          <div className="story-card">
            <span>Altitude 1,580m</span>
            High UV light exposure and chilly autumn dawn frost slow down flower opening, concentrating carotenoids.
          </div>
          <div className="story-card">
            <span>Lacustrine Karewa Soil</span>
            Ancient mineral-rich lakebed clay deposits provide natural iron, potassium, and nitrogen to dormant corms.
          </div>
          <div className="story-card">
            <span>Pure Mongra Stigmas</span>
            Only dark red stigma tips are processed — yellow style stalks are removed to ensure Grade I purity.
          </div>
        </div>
      </section>

      {/* 4-Step Craft Timeline */}
      <section id="craft-timeline" className="process-grid">
        <div>
          <p className="section-label">Artisanal Craft</p>
          <h2 className="section-title">The 4-Step Harvest Ritual</h2>
          
          <div className="timeline">
            <div className="timeline-step">
              <div className="timeline-dot"></div>
              <h3 style={{ fontSize: '1.3rem' }}>1. Pre-Dawn Hand Plucking</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Plucking begins at 5:30 AM before sunrise opens the purple tepals. Plucking flowers in closed bloom locks volatile safranal essential oils inside the stigmas.
              </p>
            </div>

            <div className="timeline-step">
              <div className="timeline-dot"></div>
              <h3 style={{ fontSize: '1.3rem' }}>2. Stigma Separation</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Artisan women separate the three crimson stigmas by hand, trimming away the pale yellow style base to isolate Grade I Mongra.
              </p>
            </div>

            <div className="timeline-step">
              <div className="timeline-dot"></div>
              <h3 style={{ fontSize: '1.3rem' }}>3. Slow Charcoal Ember Curing</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Stigmas are spread on fine silk mesh frames suspended over birch charcoal embers, drying gently at 45°C–50°C to reduce moisture to a stable 8%–9%.
              </p>
            </div>

            <div className="timeline-step">
              <div className="timeline-dot"></div>
              <h3 style={{ fontSize: '1.3rem' }}>4. Brass Tin Maturation</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Dried Mongra threads rest in food-grade brass tins for 14 days in darkness. This maturation phase allows volatile aroma compounds to harmonize before sealing.
              </p>
            </div>
          </div>
        </div>

        <aside className="process-card">
          <h3>ISO 3632-2 Spectrophotometry</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 'var(--space-4) 0' }}>
            <span className="meta-pill">GI Registration No. 635</span>
            <span className="meta-pill">ISO 3632 Category I</span>
            <span className="meta-pill">IIKSTC Dusoo Tested</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            Every Zaafraan harvest batch is analyzed at the IIKSTC NABL laboratory in Dusoo, Pampore for three biochemical markers:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)', fontSize: '0.85rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Crocin (Coloring Strength A440nm):</strong><br />
              Category I threshold &ge; 200 (Zaafraan tests 250 – 280+).
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ color: '#fff' }}>Safranal (Aroma A330nm):</strong><br />
              Category I threshold 20–50 (Zaafraan tests 38 – 45).
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ color: '#fff' }}>Picrocrocin (Flavor A257nm):</strong><br />
              Category I threshold &ge; 70 (Zaafraan tests 88 – 96).
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/quality" className="btn btn-outline btn-sm">
              Lookup Batch Certificate &rarr;
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
};
