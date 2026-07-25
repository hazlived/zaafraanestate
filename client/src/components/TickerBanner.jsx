import React from 'react';
import { Sparkles, Award, Truck, Tag } from 'lucide-react';

export const TickerBanner = () => {
  return (
    <div className="ticker-banner-wrap">
      <div className="ticker-track">
        <div className="ticker-content">
          <span><Sparkles size={14} color="var(--color-primary)" /> 100% PURE KASHMIRI MONGRA SAFFRON</span>
          <span><Award size={14} color="var(--color-primary)" /> HARVEST 2025 · PAMPORE KAREWA ORIGIN</span>
          <span><Truck size={14} color="var(--color-primary)" /> SHIPPING ACROSS ALL OF INDIA</span>
          <span><Tag size={14} color="var(--color-primary)" /> USE CODE <strong>PURESAFFRON</strong> FOR DISCOUNTED SHIPPING</span>
          <span><Sparkles size={14} color="var(--color-primary)" /> DIRECT FROM PAMPORE KAREWA SOILS</span>
        </div>
        <div className="ticker-content" aria-hidden="true">
          <span><Sparkles size={14} color="var(--color-primary)" /> 100% PURE KASHMIRI MONGRA SAFFRON</span>
          <span><Award size={14} color="var(--color-primary)" /> HARVEST 2025 · PAMPORE KAREWA ORIGIN</span>
          <span><Truck size={14} color="var(--color-primary)" /> SHIPPING ACROSS ALL OF INDIA</span>
          <span><Tag size={14} color="var(--color-primary)" /> USE CODE <strong>PURESAFFRON</strong> FOR DISCOUNTED SHIPPING</span>
          <span><Sparkles size={14} color="var(--color-primary)" /> DIRECT FROM PAMPORE KAREWA SOILS</span>
        </div>
      </div>
    </div>
  );
};
