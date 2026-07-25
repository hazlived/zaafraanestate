import React, { useState, useEffect, useRef } from 'react';
import { Flame, Droplets, Clock, Sparkles, Play, Pause, RotateCcw, CheckCircle2, ChevronDown, ChevronUp, Check } from 'lucide-react';

export const BloomingCalculator = () => {
  const [servings, setServings] = useState(4);
  const [beverageType, setBeverageType] = useState('kahwa');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const calcMap = {
    kahwa: {
      title: 'Kashmiri Kahwa Tea',
      subText: '10 mins · 1.25 threads/cup',
      threadsPerCup: 1.25,
      temp: '80°C–85°C',
      timeStr: '10 mins',
      totalSeconds: 600,
      base: 'Warm Mineral Water or Green Tea',
      liquidColor: 'rgba(217, 130, 43, 0.75)'
    },
    milk: {
      title: 'Warm Saffron Almond Milk',
      subText: '15 mins · 2.5 threads/cup',
      threadsPerCup: 2.5,
      temp: '70°C–75°C',
      timeStr: '15 mins',
      totalSeconds: 900,
      base: 'Full-Fat Warm Milk or Almond Milk',
      liquidColor: 'rgba(243, 194, 122, 0.85)'
    },
    biryani: {
      title: 'Royal Biryani Dum Bloom',
      subText: '18 mins · 2 threads/portion',
      threadsPerCup: 2.0,
      temp: '75°C',
      timeStr: '18 mins',
      totalSeconds: 1080,
      base: 'Warm Water + Desi Ghee / Rose Water',
      liquidColor: 'rgba(217, 56, 41, 0.85)'
    },
    phirni: {
      title: 'Kashmiri Saffron Phirni',
      subText: '15 mins · 2.5 threads/portion',
      threadsPerCup: 2.5,
      temp: '80°C',
      timeStr: '15 mins',
      totalSeconds: 900,
      base: 'Whole Milk + Ground Rice & Sugar',
      liquidColor: 'rgba(243, 194, 122, 0.9)'
    },
    shahi: {
      title: 'Zaafraan Shahi Tukda',
      subText: '15 mins · 3 threads/portion',
      threadsPerCup: 3.0,
      temp: '75°C',
      timeStr: '15 mins',
      totalSeconds: 900,
      base: 'Sugar Syrup & Condensed Rabri',
      liquidColor: 'rgba(217, 130, 43, 0.85)'
    },
    elixir: {
      title: 'Morning Saffron & Honey Elixir',
      subText: '5 mins · 4 threads/cup',
      threadsPerCup: 4.0,
      temp: '70°C',
      timeStr: '5 mins',
      totalSeconds: 300,
      base: 'Warm Water + Wildflower Honey & Lemon',
      liquidColor: 'rgba(243, 194, 122, 0.8)'
    },
    skin: {
      title: 'Radiance Face & Honey Mask',
      subText: '20 mins · 1.5 threads/application',
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Update timer target whenever beverageType changes
  useEffect(() => {
    setTimerRunning(false);
    setTimerFinished(false);
    setTimeLeft(currentConfig.totalSeconds);
  }, [beverageType]);

  // Countdown Interval Effect
  useEffect(() => {
    let timer = null;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && timeLeft === 0) {
      setTimerRunning(false);
      setTimerFinished(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerRunning, timeLeft]);

  const toggleTimer = () => {
    if (timerFinished) {
      resetTimer();
      setTimerRunning(true);
    } else {
      setTimerRunning(!timerRunning);
    }
  };

  const resetTimer = () => {
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

            {/* Custom Theme-Matched Dropdown */}
            <div className={`custom-dropdown-wrap ${dropdownOpen ? 'is-open' : ''}`} ref={dropdownRef}>
              <button
                type="button"
                className="custom-dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{currentConfig.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{currentConfig.subText}</span>
                </div>
                {dropdownOpen ? <ChevronUp size={20} color="var(--color-primary)" /> : <ChevronDown size={20} color="var(--color-primary)" />}
              </button>

              {dropdownOpen && (
                <div className="custom-dropdown-menu">
                  {Object.keys(calcMap).map((key) => {
                    const item = calcMap[key];
                    const isSelected = beverageType === key;
                    return (
                      <div
                        key={key}
                        className={`custom-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => {
                          setBeverageType(key);
                          setDropdownOpen(false);
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: isSelected ? '700' : '500' }}>{item.title}</span>
                          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{item.subText}</span>
                        </div>
                        {isSelected && <Check size={16} color="var(--color-primary)" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
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
                    className="visual-saffron-thread"
                    style={{
                      left: `${15 + (idx * 11) % 70}%`,
                      top: `${20 + (idx * 17) % 55}%`,
                      animationDelay: `${idx * 0.4}s`
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

            <div className="simmer-timer-display">
              <span className="timer-clock-digits">{formatTime(timeLeft)}</span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={`btn-timer-action ${timerRunning ? 'is-active' : ''}`}
                  onClick={toggleTimer}
                >
                  {timerRunning ? (
                    <>
                      <Pause size={14} /> Pause
                    </>
                  ) : timerFinished ? (
                    <>
                      <RotateCcw size={14} /> Restart
                    </>
                  ) : (
                    <>
                      <Play size={14} /> Start Simmer
                    </>
                  )}
                </button>

                {(timerRunning || timeLeft !== currentConfig.totalSeconds) && (
                  <button className="btn-timer-reset" onClick={resetTimer} title="Reset Timer">
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Simmer Progress Track */}
            <div className="simmer-progress-track">
              <div
                className="simmer-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {timerFinished && (
              <div className="timer-completed-toast">
                <CheckCircle2 size={16} color="#10b981" />
                <span>Infusion Complete! Maximum Crocin A440nm Extracted.</span>
              </div>
            )}
          </div>

          <div className="calc-guarantee-note">
            <Droplets size={16} color="var(--color-primary)" />
            <span>Grade I Mongra all-red threads release rich golden crocin pigment within 10–15 minutes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
