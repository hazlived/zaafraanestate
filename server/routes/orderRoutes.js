const express = require('express');
const router = express.Router();
const { handleOrderSubmit } = require('../controllers/orderController');

// POST /api/orders
router.post('/', handleOrderSubmit);

module.exports = router;
