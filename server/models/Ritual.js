const mongoose = require('mongoose');

const ritualSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  prepTime: { type: String, required: true },
  bloomTemp: { type: String, required: true },
  threads: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  image: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ritual', ritualSchema);
