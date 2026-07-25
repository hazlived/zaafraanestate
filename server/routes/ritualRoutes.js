const express = require('express');
const router = express.Router();
const { getRituals, getRitualById } = require('../controllers/ritualController');

router.get('/', getRituals);
router.get('/:id', getRitualById);

module.exports = router;
