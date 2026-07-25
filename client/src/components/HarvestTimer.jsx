import React, { useState, useEffect } from 'react';
import { Clock, Flame, Sparkles } from 'lucide-react';

export const HarvestTimer = () => {
  // Target date: Next Pampore Saffron Autumn Harvest (October 25)
  const calculateTimeLeft = () => {
    const now = new Date();
    let targetYear = now.getFullYear();
    let target = new Date(`October 25, ${targetYear} 05:30:00`);
    if (now > target) {
      target = new Date(`October 25, ${targetYear + 1} 05:30:00`);
    }

    const diff = target - now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [tinsLeft, setTinsLeft] = useState(72);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtle live stock fluctuation for organic feel
  useEffect(() => {
    const stockTimer = setInterval(() => {
      setTinsLeft((prev) => (prev > 15 ? prev - (Math.random() > 0.7 ? 1 : 0) : prev));
    }, 45000);
    return () => clearInterval(stockTimer);
  }, []);

  return (
    <div className="harvest-timer-box">
      <div className="timer-header">
        <span className="timer-tagline">2025 Dawn Bloom Reserve</span>
      </div>

      <div className="timer-grid">
        <div className="timer-block">
          <span className="timer-val">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="timer-lbl">Days</span>
        </div>
        <div className="timer-colon">:</div>
        <div className="timer-block">
          <span className="timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="timer-lbl">Hours</span>
        </div>
        <div className="timer-colon">:</div>
        <div className="timer-block">
          <span className="timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="timer-lbl">Mins</span>
        </div>
        <div className="timer-colon">:</div>
        <div className="timer-block">
          <span className="timer-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="timer-lbl">Secs</span>
        </div>
      </div>

      <div className="stock-status-bar">
        <div className="stock-label">
          <span>Remaining Vacuum-Sealed Tins:</span>
          <strong className="stock-count-glow">{tinsLeft} tins available</strong>
        </div>
        <div className="stock-progress-track">
          <div className="stock-progress-fill" style={{ width: `${(tinsLeft / 100) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};
