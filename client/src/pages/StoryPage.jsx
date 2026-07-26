import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Sparkles, Flame, PackageCheck, ShieldCheck, MapPin } from 'lucide-react';
import { SaffronPurityGuide } from '../components/SaffronPurityGuide';
import { SaffronStorageGuide } from '../components/SaffronStorageGuide';

export const StoryPage = () => {
  const steps = [
    {
      num: '01',
      title: 'Dawn Picking',
      text: 'Flowers plucked strictly between 5:00 AM and 8:00 AM before sunlight opens the petals and degrades volatiles.',
      icon: <Sun size={22} />
    },
    {
      num: '02',
      title: 'Manual Stigma Separation',
      text: 'Master artisans strip the three crimson Mongra stigmas from yellow floral stalks by hand with surgical precision.',
      icon: <Sparkles size={22} />
    },
    {
      num: '03',
      title: 'Birch Charcoal Curing',
      text: 'Stigmas are gently toasted over slow birch embers in traditional wicker baskets to maintain 8-9% ideal moisture.',
      icon: <Flame size={22} />
    },
    {
      num: '04',
      title: 'Sealed Brass Packaging',
      text: 'Airtight brass tins protect fragile stigmas from light, humidity, and atmospheric oxidation.',
      icon: <PackageCheck size={22} />
    }
  ];

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
            <Link to="/shop" className="btn btn-outline">Shop 2025 Harvest</Link>
          </div>
        </div>

        <div className="story-image-box">
          <img src="/images/pampore_field.png" alt="Pampore saffron crocus fields under mountain dawn" />
        </div>
      </section>

      {/* Terroir & Specs */}
      <section style={{ padding: 'var(--space-12) 0', borderTop: 'var(--glass-border)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <p className="section-label">Pampore Terroir</p>
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

      {/* 4-Step Craft Vertical Timeline */}
      <section id="craft-timeline" className="timeline-section-wrap">
        <div className="timeline-header-center">
          <p className="section-label">Artisanal Craft</p>
          <h2 className="section-title">The 4-Step Harvest Ritual</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Industrial mechanical drying strips saffron of its natural safranal essential oil. At Zaafraan Estate, every harvest follows traditional Kashmiri manual curing.
          </p>
        </div>

        <div className="timeline-container">
          {steps.map((step) => (
            <div key={step.num} className="timeline-item">
              <div className="timeline-node-icon">
                {step.icon}
              </div>
              <div className="timeline-card-content">
                <span className="timeline-step-tag">Step {step.num}</span>
                <h3 className="timeline-card-title">{step.title}</h3>
                <p className="timeline-card-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Fake vs Pure Spotter Guide */}
      <SaffronPurityGuide />

      {/* Storage & Care Guide */}
      <SaffronStorageGuide />
    </main>
  );
};
