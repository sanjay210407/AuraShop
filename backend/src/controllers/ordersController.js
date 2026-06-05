const { orders } = require('../models/dataStore');
const { getUserCart, withProduct, cartSummary, clearUserCart } = require('./cartController');

function createOrder(req, res) {
  const { address, paymentMethod } = req.body;

  if (!address || !paymentMethod) {
    return res.status(400).json({ message: 'Address and payment method are required.' });
  }

  const userId = req.session.userId;
  const cart = getUserCart(userId);
  const mapped = withProduct(cart);

  if (mapped.length === 0) {
    return res.status(400).json({ message: 'Cart is empty.' });
  }

  const summary = cartSummary(mapped);
  const order = {
    id: `o${Date.now()}`,
    createdAt: new Date().toISOString(),
    address,
    paymentMethod,
    ...summary
  };

  if (!orders[userId]) {
    orders[userId] = [];
  }

  orders[userId].push(order);
  clearUserCart(userId);

  return res.status(201).json({ order });
}

function listOrders(req, res) {
  const userOrders = orders[req.session.userId] || [];
  return res.json({ orders: userOrders });
}

module.exports = {
  createOrder,
  listOrders
};
