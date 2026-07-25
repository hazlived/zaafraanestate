import React, { useState, useEffect } from 'react';
import { Flame, Droplets, Clock, Sparkles, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

export const BloomingCalculator = () => {
  const [servings, setServings] = useState(4);
  const [beverageType, setBeverageType] = useState('kahwa'); // 'kahwa' | 'milk' | 'biryani' | 'skin'

  const calcMap = {
    kahwa: {
      title: 'Kashmiri Kahwa Tea',
      threadsPerCup: 1.25,
      temp: '80°C–85°C',
      timeStr: '10 mins',
      totalSeconds: 600,
      base: 'Warm Mineral Water or Green Tea',
      liquidColor: 'rgba(217, 130, 43, 0.75)'
    },
    milk: {
      title: 'Warm Saffron Milk',
      threadsPerCup: 2.5,
      temp: '70°C–75°C',
      timeStr: '15 mins',
      totalSeconds: 900,
      base: 'Full-Fat Warm Milk or Almond Milk',
      liquidColor: 'rgba(243, 194, 122, 0.85)'
    },
    biryani: {
      title: 'Royal Biryani Dum Bloom',
      threadsPerCup: 2.0,
      temp: '75°C',
      timeStr: '18 mins',
      totalSeconds: 1080,
      base: 'Warm Water + Desi Ghee / Rose Water',
      liquidColor: 'rgba(217, 56, 41, 0.85)'
    },
    skin: {
      title: 'Radiance Face Mask',
      threadsPerCup: 1.5,
      temp: 'Room Temp',
      timeStr: '20 mins',
      totalSeconds: 1200,
      base: 'Raw Honey or Milk Cream (Malai)',
      liquidColor: 'rgba(252, 213, 149, 0.9)'
    }
  };

  const currentConfig = calcMap[beverageType];
  const rawThreads = servings * currentConfig.threadsPerCup;
  const totalThreads = Number.isInteger(rawThreads) ? rawThreads : rawThreads.toFixed(2);
  const approxGrams = (rawThreads / 450).toFixed(3);

  // Live Simmering Countdown State
  const [timeLeft, setTimeLeft] = useState(currentConfig.totalSeconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  // Update timer target whenever beverageType changes
  useEffect(() => {
    setTimerRunning(false);
    setTimerFinished(false);
    setTimeLeft(currentConfig.totalSeconds);
  }, [beverageType]);

  // Countdown Ticker Effect
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerFinished(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(currentConfig.totalSeconds);
    setTimerFinished(false);
    setTimerRunning(true);
  };

  const handlePause = () => {
    setTimerRunning(false);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setTimerFinished(false);
    setTimeLeft(currentConfig.totalSeconds);
  };

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = Math.round(
    ((currentConfig.totalSeconds - timeLeft) / currentConfig.totalSeconds) * 100
  );

  return (
    <div className="calculator-box glow-card-effect">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p className="section-label">Interactive Culinary Tool</p>
        <h2 className="section-title">Saffron Bloom & Yield Visualizer</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Watch Grade I Mongra crocin pigment release into your infusion as you adjust serving quantities.
        </p>
      </div>

      <div className="calc-grid">
        <div>
          <div className="form-group">
            <label>Select Recipe / Beverage Type</label>
            <select value={beverageType} onChange={(e) => setBeverageType(e.target.value)}>
              <option value="kahwa">Kashmiri Kahwa Tea (10 mins · 1.25 threads/cup)</option>
              <option value="milk">Warm Saffron Almond Milk (15 mins · 2.5 threads/cup)</option>
              <option value="biryani">Royal Biryani Dum Bloom (18 mins · 2 threads/portion)</option>
              <option value="skin">Radiance Face & Honey Mask (20 mins · 1.5 threads/application)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Servings / Cups ({servings})</label>
            <input
              type="range"
              min="1"
              max="20"
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value, 10))}
              style={{ accentColor: 'var(--color-primary)' }}
            />
          </div>

          {/* Interactive Animated Blooming Vessel */}
          <div className="blooming-vessel-wrap">
            <div className={`vessel-rim ${timerRunning ? 'is-simmering' : ''}`}>
              <div
                className="liquid-wave-animation"
                style={{
                  background: currentConfig.liquidColor,
                  filter: timerRunning ? 'brightness(1.2)' : 'none'
                }}
              />
              <div className="blooming-threads-group">
                {Array.from({ length: Math.min(8, Math.ceil(rawThreads)) }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`blooming-thread-item ${timerRunning ? 'thread-active-simmer' : ''}`}
                    style={{
                      left: `${15 + idx * 10}%`,
                      animationDelay: `${idx * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
            <span className="vessel-caption">
              {timerRunning ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Flame size={13} color="var(--color-saffron-red)" className="flame-pulse" />
                  Simmering & Extracting Crocin...
                </span>
              ) : (
                'Live Infusion Color Extraction (A440nm)'
              )}
            </span>
          </div>
        </div>

        <div className="calc-result-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Sparkles size={18} className={timerRunning ? 'spin-slow' : ''} />
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                Extraction Parameters
              </span>
            </div>
            <span className="meta-pill" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
              {currentConfig.temp}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Required Mongra Threads</div>
              <div className="calc-highlight">{totalThreads} <span style={{ fontSize: '1rem' }}>threads</span></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>approx. {approxGrams} grams</div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Liquid Medium</div>
              <div style={{ fontWeight: '600', marginTop: '4px', fontSize: '0.9rem', color: '#fff' }}>{currentConfig.base}</div>
            </div>
          </div>

          {/* Live Simmering Countdown Timer Module */}
          <div className="simmer-timer-module">
            <div className="simmer-timer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={16} color={timerRunning ? 'var(--color-saffron-red)' : 'var(--color-primary)'} className={timerRunning ? 'flame-pulse' : ''} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
                  {currentConfig.title} Simmering Timer
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Target: {currentConfig.timeStr}
              </span>
            </div>

            <div className="simmer-clock-display">
              <div className="simmer-digits">{formatTime(timeLeft)}</div>

              <div className="simmer-controls">
                {!timerRunning ? (
                  <button className="btn btn-primary btn-sm" onClick={handleStart}>
                    <Play size={14} /> Start Simmering
                  </button>
                ) : (
                  <button className="btn btn-outline btn-sm" onClick={handlePause}>
                    <Pause size={14} /> Pause
                  </button>
                )}
                <button className="btn btn-outline btn-sm" onClick={handleReset} title="Reset timer">
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Simmer Progress Bar */}
            <div className="simmer-progress-track">
              <div className="simmer-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>

            {timerFinished && (
              <div className="simmer-complete-badge">
                <CheckCircle2 size={16} /> Bloom Complete! Peak Crocin Extracted.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
