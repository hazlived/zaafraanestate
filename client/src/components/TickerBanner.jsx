import React from 'react';
import { Sparkles, Award, Truck, Tag } from 'lucide-react';

export const TickerBanner = () => {
  return (
    <div className="ticker-banner-wrap">
      <div className="ticker-track">
        <div className="ticker-content">
          <span><Sparkles size={14} color="var(--color-primary)" /> 100% PURE KASHMIRI MONGRA SAFFRON (₹579 / 1G)</span>
          <span><Award size={14} color="var(--color-primary)" /> GI TAG REGISTRATION NO. 635</span>
          <span><Truck size={14} color="var(--color-primary)" /> STANDARD SHIPPING ACROSS INDIA (₹99)</span>
          <span><Tag size={14} color="var(--color-primary)" /> USE CODE <strong>PURESAFFRON</strong> FOR ₹21 SHIPPING</span>
          <span><Sparkles size={14} color="var(--color-primary)" /> DIRECT FROM PAMPORE KAREWA SOILS</span>
        </div>
        <div className="ticker-content" aria-hidden="true">
          <span><Sparkles size={14} color="var(--color-primary)" /> 100% PURE KASHMIRI MONGRA SAFFRON (₹579 / 1G)</span>
          <span><Award size={14} color="var(--color-primary)" /> GI TAG REGISTRATION NO. 635</span>
          <span><Truck size={14} color="var(--color-primary)" /> STANDARD SHIPPING ACROSS INDIA (₹99)</span>
          <span><Tag size={14} color="var(--color-primary)" /> USE CODE <strong>PURESAFFRON</strong> FOR ₹21 SHIPPING</span>
          <span><Sparkles size={14} color="var(--color-primary)" /> DIRECT FROM PAMPORE KAREWA SOILS</span>
        </div>
      </div>
    </div>
  );
};
