import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useCart } from '../context/CartContext';
import { X, Trash2, Tag, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    openCheckout,
    applyPromo,
    promoMessage
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isDrawerOpen) return null;

  const itemList = Object.values(items);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
    }
  };

  return ReactDOM.createPortal(
    <div className="cart-overlay" onClick={closeDrawer}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.25rem' }}>Your Harvest Tray</h3>
          </div>
          <button className="close-btn" onClick={closeDrawer} aria-label="Close tray">
            <X size={22} />
          </button>
        </div>

        {itemList.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', color: 'var(--color-text-muted)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(243,194,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ShoppingBag size={32} />
            </div>
            <p>Your tray is currently empty.</p>
            <button className="btn btn-outline btn-sm" onClick={closeDrawer}>
              Explore Saffron Tins
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {itemList.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <div className="cart-item-price">₹{item.price.toLocaleString()} each</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: '6px' }}>
                      <div className="quantity-stepper" style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
                        <button type="button" onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                      </div>
                      <button className="cart-remove-btn" onClick={() => removeItem(item.id)} title="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. PURESAFFRON)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    style={{ width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}
                  />
                </div>
                <button className="btn btn-outline btn-sm" type="submit">Apply</button>
              </form>
              {promoMessage && (
                <div style={{ fontSize: '0.78rem', color: promoMessage.includes('applied') ? 'var(--color-primary)' : 'var(--color-saffron-red)' }}>
                  {promoMessage}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span style={{ color: '#fff' }}>₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)' }}>
                    <span>Promo Discount:</span>
                    <span>- ₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-primary)' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', color: '#fff', paddingTop: 'var(--space-2)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>Total Amount:</span>
                  <span style={{ color: 'var(--color-primary)' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} onClick={openCheckout}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};
