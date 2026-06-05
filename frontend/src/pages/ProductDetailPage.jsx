import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, user } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data.product))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <h3>${product.price.toFixed(2)}</h3>
        <button
          type="button"
          onClick={() => (user ? addToCart(product.id, 1) : alert('Please login first.'))}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetailPage;
