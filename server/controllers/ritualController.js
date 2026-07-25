const ritualsData = require('../data/rituals');

// GET /api/rituals
const getRituals = (req, res) => {
  try {
    res.json({ success: true, count: ritualsData.length, data: ritualsData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/rituals/:id
const getRitualById = (req, res) => {
  try {
    const item = ritualsData.find(r => r.id === req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Ritual recipe not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getRituals,
  getRitualById
};
