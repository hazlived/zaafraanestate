import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Droplets, Fingerprint, FlaskConical, CheckCircle2, XCircle } from 'lucide-react';

export const SaffronPurityGuide = () => {
  const [activeTest, setActiveTest] = useState('test1');

  const tests = {
    test1: {
      id: 'test1',
      title: 'Cold Water Blooming Test',
      subtitle: 'Observe color extraction speed and stigma thread color retention in room temperature water.',
      icon: <Droplets size={20} />,
      pure: {
        title: 'Pure Pampore Mongra',
        colorTag: 'Golden-Yellow Elixir',
        description: 'Releases a radiant golden-yellow liquid gradually over 10 to 15 minutes. The deep crimson stigma thread retains its rich red color and never turns white.',
        badgeColor: '#10b981'
      },
      fake: {
        title: 'Adulterated / Dyed Fake',
        colorTag: 'Instant Dark Red / Pink',
        description: 'Instantly bleeds harsh dark red or pink dye within seconds. The artificial thread loses its color completely and turns pale or white.',
        badgeColor: 'var(--color-saffron-red)'
      }
    },
    test2: {
      id: 'test2',
      title: 'Finger Friction & Texture Test',
      subtitle: 'Rub a bloomed stigma thread gently between damp fingertips to test fiber elasticity and natural pigment.',
      icon: <Fingerprint size={20} />,
      pure: {
        title: 'Pure Pampore Mongra',
        colorTag: 'Firm & Elastic Fiber',
        description: 'The bloomed thread stays completely intact, pliable, and strong. It leaves a pure golden-yellow stain on skin that washes away easily.',
        badgeColor: '#10b981'
      },
      fake: {
        title: 'Adulterated / Dyed Fake',
        colorTag: 'Crumbles to Mush',
        description: 'Made from dyed corn silk or paper pulp — crumbles into mush instantly when pressed, leaving chemical red stains on fingertips.',
        badgeColor: 'var(--color-saffron-red)'
      }
    },
    test3: {
      id: 'test3',
      title: 'Baking Soda Chemical Reaction',
      subtitle: 'Mix saffron-infused water with a tiny pinch of baking soda to test natural crocin pH behavior.',
      icon: <FlaskConical size={20} />,
      pure: {
        title: 'Pure Pampore Mongra',
        colorTag: 'Bright Clear Yellow',
        description: 'Natural crocin carotenoid pigment reacts with baking soda to yield a clear, vibrant sunshine yellow solution.',
        badgeColor: '#10b981'
      },
      fake: {
        title: 'Adulterated / Dyed Fake',
        colorTag: 'Murky Reddish-Purple',
        description: 'Artificial food dyes (tartrazine or azo dyes) react negatively, turning the water murky reddish-brown, dark orange, or purple.',
        badgeColor: 'var(--color-saffron-red)'
      }
    }
  };

  const current = tests[activeTest];

  return (
    <section className="purity-guide-wrap">
      <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto var(--space-8)' }}>
        <p className="section-label">Buyer Protection & Authenticity</p>
        <h2 className="section-title">How to Verify Pure Kashmiri Saffron</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
          Real Pampore Mongra is one of the world's most precious spices. Use these 3 home tests to verify 100% genuine saffron.
        </p>
      </div>

      {/* Test Tabs */}
      <div className="purity-tabs-row">
        {Object.values(tests).map((test) => (
          <button
            key={test.id}
            className={`purity-tab-btn ${activeTest === test.id ? 'is-active' : ''}`}
            onClick={() => setActiveTest(test.id)}
          >
            {test.icon}
            <span>{test.title}</span>
          </button>
        ))}
      </div>

      {/* Active Test Comparison Card */}
      <div className="purity-comparison-box">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>{current.title}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{current.subtitle}</p>
        </div>

        <div className="purity-cards-grid">
          {/* Pure Result */}
          <div className="purity-result-card is-pure">
            <div className="purity-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                <CheckCircle2 size={20} />
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{current.pure.title}</strong>
              </div>
              <span className="purity-status-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid #10b981' }}>
                {current.pure.colorTag}
              </span>
            </div>
            <p className="purity-card-desc">{current.pure.description}</p>
          </div>

          {/* Fake Result */}
          <div className="purity-result-card is-fake">
            <div className="purity-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-saffron-red)' }}>
                <XCircle size={20} />
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{current.fake.title}</strong>
              </div>
              <span className="purity-status-badge" style={{ background: 'rgba(217, 56, 41, 0.15)', color: 'var(--color-saffron-red)', border: '1px solid var(--color-saffron-red)' }}>
                {current.fake.colorTag}
              </span>
            </div>
            <p className="purity-card-desc">{current.fake.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
