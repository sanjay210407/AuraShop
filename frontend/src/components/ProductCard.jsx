import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, user } = useShop();
  const liked = wishlist.includes(product.id);

  const handleAdd = async () => {
    if (!user) {
      alert('Please login to add items to your cart.');
      return;
    }

    await addToCart(product.id, 1);
  };

  return (
    <article className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-content">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
      <div className="card-actions">
        <Link to={`/products/${product.id}`} className="btn-secondary">View</Link>
        <button type="button" onClick={handleAdd}>Add to Cart</button>
        <button type="button" className="btn-icon" onClick={() => toggleWishlist(product.id)}>
          {liked ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
