// Zaafraan Estate API Service Client

export const fetchProducts = async (category = '', search = '') => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const res = await fetch(`/api/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn('API error (falling back to static fallback):', err);
    return null;
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (err) {
    console.warn('API error:', err);
    return null;
  }
};

export const fetchRituals = async () => {
  try {
    const res = await fetch('/api/rituals');
    if (!res.ok) throw new Error('Failed to fetch rituals');
    return await res.json();
  } catch (err) {
    console.warn('API error:', err);
    return null;
  }
};

export const verifyBatchCode = async (batchId) => {
  try {
    const res = await fetch(`/api/quality/batch/${encodeURIComponent(batchId)}`);
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Server communication error.' };
  }
};

export const submitContactInquiry = async (formData) => {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Could not connect to concierge server.' };
  }
};

export const submitOrder = async (orderData) => {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Order submission error. Could not connect to order server.' };
  }
};
