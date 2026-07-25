import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TickerBanner } from './components/TickerBanner';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { ShopPage } from './pages/ShopPage';
import { RitualsPage } from './pages/RitualsPage';
import { QualityPage } from './pages/QualityPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="top-navbar-fixed-wrap">
          <TickerBanner />
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/rituals" element={<RitualsPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <Toast />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
