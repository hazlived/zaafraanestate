import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { BloomingCalculator } from '../components/BloomingCalculator';
import { HarvestTimer } from '../components/HarvestTimer';
import { FloatingFilaments } from '../components/FloatingFilaments';
import { ArrowRight, ShieldCheck, Sparkles, Award, MapPin } from 'lucide-react';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((res) => {
      if (res && res.data) {
        setFeaturedProducts(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="page-shell">
      {/* Floating Glowing Particle Canvas */}
      <FloatingFilaments />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Pure Kashmiri Mongra<br />
            <span className="gradient-text">Threads of light and autumn.</span>
          </h1>
          <p className="lead">
            Hand-harvested <em>Crocus sativus L.</em> stigmas from the mineral-rich Karewa soils of Pampore. Slowly dried over charcoal to preserve maximum crocin pigment, floral safranal, and natural warmth.
          </p>

          <div className="hero-meta">
            <div className="meta-pill">GI Tag Certified (2020)</div>
            <div className="meta-pill">ISO 3632 Category I Mongra</div>
            <div className="meta-pill">IIKSTC Dusoo Lab Tested</div>
          </div>

          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop 2025 Harvest <ArrowRight size={16} />
            </Link>
            <Link to="/story" className="btn btn-outline">
              Terroir & Craft
            </Link>
          </div>

          {/* Live Pampore Harvest Countdown Clock & Stock Ticker */}
          <HarvestTimer />
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <img src="/images/hero_saffron.png" alt="Pure Kashmiri Mongra saffron stigmas in brass bowl" />
            <div className="hero-overlay">
              <div className="overlay-top">
                <div className="overlay-badge">Zaafraan Estate · Pampore Karewas</div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-text-muted)' }}>Elevation</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)' }}>1,580 m</div>
                </div>
              </div>

              <div className="overlay-bottom">
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-text-muted)' }}>Crocin Absorptivity (A440nm)</div>
                  <strong style={{ color: 'var(--color-primary)' }}>250+ Category I</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>100% Mongra (All-Red Stigma Tips)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-text-muted)' }}>Harvest Batch</div>
                  <strong style={{ color: '#fff' }}>ZE-2025-089</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>NABL Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terroir & Origin Section */}
      <section className="story-grid-layout">
        <div>
          <p className="section-label">Geographical Indication & Terroir</p>
          <h2 className="section-title">Born in Pleistocene Karewa Clay</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            At Zaafraan Estate in Pampore, saffron cultivation relies on ancient lacustrine <strong>Karewa soil deposits</strong>—rich in iron, clay, and essential organic minerals. Plucked before sunrise in late October, each <em>Crocus sativus</em> flower yields exactly three deep crimson stigmas.
          </p>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-muted)' }}>
            Our Grade I Mongra contains strictly the dark red stigma tips. By removing the yellow style base, our saffron delivers higher crocin water-solubility and richer safranal aroma than any standard grade.
          </p>

          <div className="story-cards-wrapper">
            <div className="story-card">
              <span>GI Certified (2020)</span>
              Protected geographical status guaranteeing 100% origin from Kashmir Valley.
            </div>
            <div className="story-card">
              <span>Grade I Mongra</span>
              All-red stigma tips with zero yellow style fillers or artificial weighting.
            </div>
            <div className="story-card">
              <span>IIKSTC Tested</span>
              Spectrophotometer batch certified at Dusoo Pampore facility under ISO 3632-2.
            </div>
            <div className="story-card">
              <span>Low Moisture (8-9%)</span>
              Charcoal ember curing preserves essential terpenes and prevents molding.
            </div>
          </div>
        </div>

        <div className="story-image-box">
          <img src="/images/pampore_field.png" alt="Purple saffron crocus blooming fields in Pampore" />
          <div className="story-ribbon">
            Pampore · 34.02° N, 74.93° E · Himalayan autumn light meeting Crocus bloom.
          </div>
        </div>
      </section>

      {/* Featured Products Sampler */}
      <section className="products-box">
        <div className="products-header">
          <div>
            <p className="section-label">2025 Harvest Tins</p>
            <h2 className="section-title">Select your saffron ritual</h2>
            <p className="lead" style={{ fontSize: '0.95rem' }}>
              Each brass tin contains exclusively Grade I Mongra threads. A pinch bloomed in 75°C-85°C warm water or milk releases rich crimson gold for kahwa, phirni, or biryani.
            </p>
          </div>
          <Link to="/shop" className="btn btn-outline">
            Explore Collection &rarr;
          </Link>
        </div>

        <div className="products-grid">
          {loading ? (
            <div style={{ color: 'var(--color-text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-8)' }}>
              Loading 2025 Harvest Tins...
            </div>
          ) : (
            featuredProducts.slice(0, 3).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))
          )}
        </div>
      </section>

      {/* Interactive Blooming Calculator with Animated Visual Vessel */}
      <BloomingCalculator />
    </main>
  );
};
