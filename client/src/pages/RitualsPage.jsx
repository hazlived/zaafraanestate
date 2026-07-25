import React, { useEffect, useState } from 'react';
import { fetchRituals } from '../services/api';
import { BloomingCalculator } from '../components/BloomingCalculator';
import { Clock, Flame, Sparkles, CheckCircle2, Plus, Minus } from 'lucide-react';

export const RitualsPage = () => {
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAccordions, setOpenAccordions] = useState({ 0: true });

  useEffect(() => {
    fetchRituals().then((res) => {
      if (res && res.data) {
        setRituals(res.data);
      }
      setLoading(false);
    });
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <main className="page-shell">
      <section style={{ padding: 'var(--space-10) 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto var(--space-10)' }}>
          <p className="section-label">Culinary Alchemy & Wellness</p>
          <h1>Saffron Infusions & Recipes</h1>
          <p className="lead" style={{ margin: 'var(--space-4) auto 0' }}>
            Discover how Kashmiris unlock the fragrant safranal and golden crocin pigment through centuries-old blooming traditions.
          </p>
        </div>

        {/* 2-Column Layout: Left = Expandable Recipes, Right = Constant Sticky Culinary Tool */}
        <div className="rituals-sticky-layout">
          {/* Left Column: Expandable/Collapsible Recipe Menus (+/-) */}
          <div className="recipes-accordion-list">
            <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: 'var(--space-6)' }}>
              Authentic Kashmiri Recipes
            </h2>

            {loading ? (
              <div style={{ color: 'var(--color-text-muted)', padding: 'var(--space-8)' }}>
                Loading Saffron Recipes...
              </div>
            ) : (
              rituals.map((ritual, idx) => {
                const isOpen = !!openAccordions[idx];

                return (
                  <div key={ritual.id} className={`recipe-accordion-card ${isOpen ? 'is-expanded' : ''}`}>
                    {/* Accordion Header (Clickable with +/- button) */}
                    <button
                      className="recipe-accordion-header"
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="recipe-header-left">
                        <img src={ritual.image} alt={ritual.title} className="recipe-thumb-img" />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="meta-pill" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>{ritual.threads}</span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{ritual.prepTime}</span>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', marginTop: '4px', textAlign: 'left' }}>{ritual.title}</h3>
                        </div>
                      </div>

                      <div className="accordion-toggle-icon" aria-label={isOpen ? 'Collapse recipe' : 'Expand recipe'}>
                        {isOpen ? <Minus size={20} color="var(--color-primary)" /> : <Plus size={20} color="var(--color-primary)" />}
                      </div>
                    </button>

                    {/* Accordion Body (Collapsible) */}
                    {isOpen && (
                      <div className="recipe-accordion-body">
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: 'var(--space-4)' }}>
                          {ritual.description}
                        </p>

                        <div className="recipe-meta-badges">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                            <Clock size={16} color="var(--color-primary)" />
                            <span>Prep Time: <strong>{ritual.prepTime}</strong></span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                            <Flame size={16} color="var(--color-primary)" />
                            <span>Bloom Temp: <strong>{ritual.bloomTemp}</strong></span>
                          </div>
                        </div>

                        {/* Ingredients */}
                        <div style={{ marginTop: 'var(--space-4)' }}>
                          <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                            Required Ingredients:
                          </h4>
                          <ul className="recipe-ingredients-grid">
                            {ritual.ingredients?.map((ing, i) => (
                              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
                                <CheckCircle2 size={15} color="var(--color-primary)" />
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Step by Step Instructions */}
                        {ritual.steps && (
                          <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: 'var(--space-3)' }}>
                              Brewing Steps:
                            </h4>
                            <ol className="recipe-steps-list">
                              {ritual.steps.map((step, sIdx) => (
                                <li key={sIdx} style={{ marginBottom: 'var(--space-2)', color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                                  <strong style={{ color: 'var(--color-primary)' }}>Step {sIdx + 1}:</strong> {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Constant Sticky Culinary Tool */}
          <aside className="sticky-culinary-sidebar">
            <BloomingCalculator />
          </aside>
        </div>
      </section>
    </main>
  );
};
