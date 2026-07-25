import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'zaafraan_cart_v3';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [items]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const currentQty = prev[product.id] ? prev[product.id].qty : 0;
      return {
        ...prev,
        [product.id]: {
          ...product,
          qty: currentQty + qty
        }
      };
    });
    showToast(`Added ${qty}x ${product.title} to your tray.`);
  };

  const updateQuantity = (productId, newQty) => {
    setItems((prev) => {
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          qty: newQty
        }
      };
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const clearCart = () => {
    setItems({});
    setPromoCode('');
    setPromoMessage('');
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PURESAFFRON') {
      setPromoCode('PURESAFFRON');
      setPromoMessage('Promo PURESAFFRON applied! Shipping reduced to ₹21.');
      return true;
    } else if (clean === 'FRIENDS12') {
      setPromoCode('FRIENDS12');
      setPromoMessage('Special Friends & Family code FRIENDS12 applied! 12% discount & ₹10 shipping applied.');
      return true;
    } else {
      setPromoMessage('Invalid promo code.');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoMessage('');
  };

  const totalItemsCount = Object.values(items).reduce((acc, item) => acc + item.qty, 0);
  const subtotal = Object.values(items).reduce((acc, item) => acc + item.price * item.qty, 0);

  // Discount & Shipping Fee Calculation
  let discountAmount = 0;
  if (promoCode === 'FRIENDS12' && subtotal > 0) {
    discountAmount = Math.round(subtotal * 0.12);
  }

  let shippingFee = 0;
  if (subtotal > 0) {
    if (promoCode === 'PURESAFFRON') {
      shippingFee = 21;
    } else if (promoCode === 'FRIENDS12') {
      shippingFee = 10;
    } else {
      shippingFee = 99;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        promoCode,
        promoMessage,
        applyPromo,
        removePromo,
        totalItemsCount,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setIsDrawerOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
