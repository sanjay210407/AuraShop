const products = [
  {
    id: 'p1',
    name: 'Classic Tee',
    description: 'Soft cotton t-shirt for daily wear.',
    category: 'Apparel',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700'
  },
  {
    id: 'p2',
    name: 'Sport Sneakers',
    description: 'Lightweight sneakers for running and city walks.',
    category: 'Footwear',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700'
  },
  {
    id: 'p3',
    name: 'Urban Backpack',
    description: 'Water-resistant backpack with padded laptop sleeve.',
    category: 'Accessories',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700'
  },
  {
    id: 'p4',
    name: 'Smart Watch',
    description: 'Fitness and notification tracking with long battery life.',
    category: 'Electronics',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700'
  }
];

const users = [];
const carts = {};
const orders = {};

module.exports = {
  products,
  users,
  carts,
  orders
};
