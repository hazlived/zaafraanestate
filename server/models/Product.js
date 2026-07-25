const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  price: { type: Number, required: true },
  gram: { type: String, required: true },
  category: { type: String, default: 'Mongra Tins' },
  crocinScore: { type: String, default: '268.4 Absorptivity' },
  badge: { type: String, default: 'GI Tagged' },
  image: { type: String, required: true },
  description: { type: String },
  inStock: { type: Boolean, default: true },
  threadsCount: { type: Number, default: 450 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
