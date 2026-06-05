const { products } = require('../models/dataStore');

function listProducts(req, res) {
  const search = (req.query.search || '').toLowerCase();
  const category = (req.query.category || '').toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch = !search
      || product.name.toLowerCase().includes(search)
      || product.description.toLowerCase().includes(search);
    const matchesCategory = !category || product.category.toLowerCase() === category;

    return matchesSearch && matchesCategory;
  });

  res.json({ products: filtered });
}

function getProduct(req, res) {
  const product = products.find((entry) => entry.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  return res.json({ product });
}

module.exports = {
  listProducts,
  getProduct
};
