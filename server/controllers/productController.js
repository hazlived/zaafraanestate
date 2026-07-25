const productsData = require('../data/products');

// GET /api/products
const getProducts = (req, res) => {
  try {
    const { category, search } = req.query;
    let results = [...productsData];

    if (category && category !== 'All') {
      results = results.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id
const getProductById = (req, res) => {
  try {
    const product = productsData.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById
};
