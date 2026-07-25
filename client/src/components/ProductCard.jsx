import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, AlertCircle, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isInStock = product.inStock !== false;

  const handleAddToCart = () => {
    if (!isInStock) return;
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1600);
  };

  return (
    <article className={`product-card ${!isInStock ? 'is-out-of-stock' : ''}`}>
      <span className={`product-badge ${!isInStock ? 'badge-sold-out' : ''}`}>
        {isInStock ? (product.badge || 'GI Tagged Grade I') : 'Out of Stock'}
      </span>

      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} style={{ filter: !isInStock ? 'grayscale(0.5)' : 'none' }} />
      </div>

      <div className="product-info-wrap">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-note">{product.subtitle}</p>
      </div>

      <div className="product-meta">
        <div>
          <div className="product-price">₹{product.price.toLocaleString()}</div>
          <div className="product-gram">{product.gram}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '600', color: 'var(--color-text-muted)' }}>Crocin Index</div>
          <div className="crocin-score-badge" style={{ color: isInStock ? 'var(--color-primary)' : 'var(--color-text-dim)' }}>
            {product.crocinScore}
          </div>
        </div>
      </div>

      <div className="product-controls">
        {isInStock ? (
          <>
            <div className="quantity-stepper">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
              className={`btn btn-primary btn-add-tray ${isAdded ? 'btn-added-success' : ''}`}
              style={{ flex: 1 }}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="icon-pop" />
                  <span>Added to Tray!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Tray</span>
                </>
              )}
            </button>
          </>
        ) : (
          <button className="btn btn-outline btn-out-of-stock" disabled style={{ width: '100%' }}>
            <AlertCircle size={16} color="var(--color-saffron-red)" /> Out of Stock
          </button>
        )}
      </div>
    </article>
  );
};
