const express = require('express');
const router = express.Router();
const { getQualityStandards, verifyBatch } = require('../controllers/qualityController');

router.get('/standards', getQualityStandards);
router.get('/batch/:batchId', verifyBatch);

module.exports = router;
