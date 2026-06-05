import React from "react";
import { Heart, Star, ShoppingCart, Info } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const ProductCard = ({ product, setCurrentTab, setSelectedProductId }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isFavorite
        ? `${product.name} removed from wishlist.`
        : `${product.name} added to wishlist!`,
      isFavorite ? "info" : "success"
    );
  };

  const handleCardClick = () => {
    if (setSelectedProductId && setCurrentTab) {
      setSelectedProductId(product.id);
      setCurrentTab("product-details");
    }
  };

  // Helper to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<Star key={i} size={14} className="star-icon half" />);
      } else {
        stars.push(<Star key={i} size={14} className="star-icon empty" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Product Image Header */}
      <div className="product-card-image-wrapper">
        <img src={product.image} alt={product.name} className="product-card-image" loading="lazy" />
        
        {/* Wishlist Button Overlay */}
        <button
          className={`wishlist-badge ${isFavorite ? "active" : ""}`}
          onClick={handleWishlistToggle}
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isFavorite ? "var(--danger-color)" : "transparent"} />
        </button>

        {/* Low Stock Badge */}
        {product.stock <= 5 && (
          <span className="stock-pill low-stock">
            Only {product.stock} left
          </span>
        )}

        {/* Category Pill */}
        <span className="category-pill">{product.category}</span>
      </div>

      {/* Product Info Body */}
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        
        {/* Ratings */}
        <div className="product-card-rating">
          <div className="stars-wrapper">{renderStars(product.rating)}</div>
          <span className="rating-text">({product.reviewsCount})</span>
        </div>

        {/* Price & Action Row */}
        <div className="product-card-footer">
          <div className="price-tag">${product.price.toFixed(2)}</div>
          <div className="card-action-buttons">
            <button
              className="quick-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              title="View Details"
            >
              <Info size={16} />
            </button>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              title="Add to Cart"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
