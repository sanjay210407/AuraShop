const { carts, products } = require('../models/dataStore');

function getUserCart(userId) {
  if (!carts[userId]) {
    carts[userId] = [];
  }

  return carts[userId];
}

function withProduct(cart) {
  return cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        subtotal: Number((product.price * item.quantity).toFixed(2))
      };
    })
    .filter(Boolean);
}

function cartSummary(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  return {
    items: cartItems,
    total: Number(total.toFixed(2))
  };
}

function getCart(req, res) {
  const cart = getUserCart(req.session.userId);
  return res.json(cartSummary(withProduct(cart)));
}

function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const parsedQuantity = Math.max(1, Number(quantity));
  const product = products.find((entry) => entry.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const cart = getUserCart(req.session.userId);
  const item = cart.find((entry) => entry.productId === productId);

  if (item) {
    item.quantity += parsedQuantity;
  } else {
    cart.push({ productId, quantity: parsedQuantity });
  }

  return res.status(201).json(cartSummary(withProduct(cart)));
}

function updateCartItem(req, res) {
  const { quantity } = req.body;
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1.' });
  }

  const cart = getUserCart(req.session.userId);
  const item = cart.find((entry) => entry.productId === req.params.productId);

  if (!item) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }

  item.quantity = parsedQuantity;

  return res.json(cartSummary(withProduct(cart)));
}

function removeCartItem(req, res) {
  const cart = getUserCart(req.session.userId);
  const filtered = cart.filter((entry) => entry.productId !== req.params.productId);
  carts[req.session.userId] = filtered;

  return res.json(cartSummary(withProduct(filtered)));
}

function clearUserCart(userId) {
  carts[userId] = [];
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
  getUserCart,
  withProduct,
  cartSummary
};
