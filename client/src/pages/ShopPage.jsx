import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProducts(category, searchTerm).then((res) => {
      if (res && res.data) {
        setProducts(res.data);
      }
      setLoading(false);
    });
  }, [category, searchTerm]);

  const categories = ['All', 'Single Stigmas', 'Family Tins', 'Bulk Reserve', 'Gift Sets'];

  return (
    <main className="page-shell">
      <section style={{ padding: 'var(--space-10) 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto var(--space-10)' }}>
          <p className="section-label">Direct From Pampore Estate</p>
          <h1>The Saffron Vault</h1>
          <p className="lead" style={{ margin: 'var(--space-4) auto 0' }}>
            100% Grade I Kashmiri Mongra stigmas in airtight brass tins. Free express shipping across India on orders over ₹3,000.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', padding: 'var(--space-4) var(--space-6)', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: 'var(--glass-border)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-outline'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem' }}>
            <Search size={16} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search tins or specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
            Loading Saffron Collection...
          </div>
        ) : (
          <div className="products-grid">
            {products.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>
                No saffron tins match your search filter.
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
};
