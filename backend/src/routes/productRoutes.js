const express = require('express');
const { listProducts, getProduct } = require('../controllers/productsController');

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);

module.exports = router;
