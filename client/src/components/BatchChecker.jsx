import React, { useState } from 'react';
import { verifyBatchCode } from '../services/api';
import { ShieldCheck, Search, Award, CheckCircle, AlertCircle } from 'lucide-react';

export const BatchChecker = () => {
  const [batchId, setBatchId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!batchId) return;
    setLoading(true);
    const data = await verifyBatchCode(batchId);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="batch-box">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p className="section-label">IIKSTC Dusoo Verification Engine</p>
        <h2 className="section-title">Lookup Batch Lab Certificate</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Enter the batch code printed on the reverse of your Zaafraan brass tin (e.g., <strong>ZE-2025-089</strong>, <strong>ZE-2025-042</strong>, or <strong>ZE-2025-104</strong>) to query spectrophotometer results.
        </p>
      </div>

      <form onSubmit={handleVerify} style={{ display: 'flex', gap: 'var(--space-3)', maxWidth: '32rem', marginBottom: 'var(--space-6)' }}>
        <input
          type="text"
          placeholder="Enter Batch ID (e.g. ZE-2025-089)"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          style={{ flex: 1, background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          <Search size={16} /> {loading ? 'Searching...' : 'Verify'}
        </button>
      </form>

      {result && (
        result.success ? (
          <div style={{ background: 'rgba(23,31,43,0.9)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <span className="meta-pill">{result.data.status}</span>
                <h3 style={{ fontSize: '1.4rem', marginTop: 'var(--space-2)' }}>Batch {result.data.batchId}</h3>
              </div>
              <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={28} />
                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>ISO 3632 Pass</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', fontSize: '0.88rem' }}>
              <div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Crocin Absorptivity (A440nm)</div>
                <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>{result.data.crocinAbsorptivity}</strong>
              </div>
              <div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Safranal Essential Oil (A330nm)</div>
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{result.data.safranalContent}</strong>
              </div>
              <div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Picrocrocin Flavor Index (A257nm)</div>
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{result.data.picrocrocinScore}</strong>
              </div>
              <div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Moisture Level</div>
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{result.data.moistureContent}</strong>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--color-text-dim)', display: 'flex', justifyContent: 'space-between' }}>
              <div>Facility: {result.data.testingFacility}</div>
              <div>Tested: {result.data.testDate}</div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(217,56,41,0.1)', border: '1px solid var(--color-saffron-red)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-text)' }}>
            <AlertCircle size={20} color="var(--color-saffron-red)" />
            <span>{result.message}</span>
          </div>
        )
      )}
    </div>
  );
};
