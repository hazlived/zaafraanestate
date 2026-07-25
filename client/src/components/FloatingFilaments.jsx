import React from 'react';

export const FloatingFilaments = () => {
  const filaments = Array.from({ length: 12 });

  return (
    <div className="floating-filaments-container" aria-hidden="true">
      {filaments.map((_, i) => (
        <div
          key={i}
          className="filament-particle"
          style={{
            left: `${(i * 8.5 + 3) % 95}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${7 + (i % 5) * 2.5}s`,
            transform: `scale(${0.6 + (i % 4) * 0.25}) rotate(${i * 30}deg)`
          }}
        />
      ))}
    </div>
  );
};
