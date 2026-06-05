const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { createOrder, listOrders } = require('../controllers/ordersController');

const router = express.Router();

router.use(requireAuth);

router.get('/', listOrders);
router.post('/', createOrder);

module.exports = router;
