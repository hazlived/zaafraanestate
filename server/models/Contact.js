const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  refId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  inquiryType: { type: String, default: 'General' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
