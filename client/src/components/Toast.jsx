import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="floating-toast-alert" role="alert">
      <div className="toast-icon-wrap">
        <ShoppingBag size={18} color="var(--color-primary)" />
      </div>
      <div className="toast-content">
        <span>{toastMessage}</span>
      </div>
      <Sparkles size={16} color="var(--color-primary)" className="spin-slow" />
    </div>
  );
};
