import React, { useState, useEffect, useCallback } from "react";
import { Star, Heart, ShoppingCart, Plus, Minus, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { fetchProductById, fetchProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import SkeletonLoader from "../components/SkeletonLoader";
import ProductCard from "../components/ProductCard";

export default function ProductDetails({ productId, setCurrentTab, setSelectedProductId }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs"); // 'specs', 'reviews'
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const loadProductDetails = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const details = await fetchProductById(productId);
      setProduct(details);
      setQuantity(1); // reset quantity counter

      // Fetch related items under same category
      const catalog = await fetchProducts({ category: details.category });
      const related = catalog.filter((p) => p.id !== details.id).slice(0, 3);
      setRelatedProducts(related);
    } catch (err) {
      console.error("Failed to load product details:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProductDetails();
    // Scroll to top when loading details
    window.scrollTo(0, 0);
  }, [loadProductDetails]);

  if (loading) {
    return (
      <div className="product-details-page container">
        <button className="back-btn" onClick={() => setCurrentTab("products")}>
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
        <SkeletonLoader type="details" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page container text-center">
        <p>Product could not be loaded.</p>
        <button className="back-btn" onClick={() => setCurrentTab("products")}>
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity}x ${product.name} added to cart!`, "success");
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    showToast(
      isFavorite ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist!`,
      isFavorite ? "info" : "success"
    );
  };

  const handleQuantityChange = (val) => {
    const nextQty = quantity + val;
    if (nextQty >= 1 && nextQty <= product.stock) {
      setQuantity(nextQty);
    }
  };

  // Render rating stars helper
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={16} className="star-icon filled" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<Star key={i} size={16} className="star-icon half" />);
      } else {
        stars.push(<Star key={i} size={16} className="star-icon empty" />);
      }
    }
    return stars;
  };

  // Mock secondary thumbnails using CSS tint modifications
  const thumbnails = [product.image, product.image, product.image];

  return (
    <div className="product-details-page fade-in">
      {/* Navigation Breadcrumb & Back button */}
      <div className="details-header-nav">
        <button className="back-btn" onClick={() => setCurrentTab("products")}>
          <ArrowLeft size={16} />
          <span>Back to catalog</span>
        </button>
        <div className="details-breadcrumb">
          <span onClick={() => setCurrentTab("home")}>Home</span>
          <span className="divider">/</span>
          <span onClick={() => setCurrentTab("products")}>Shop</span>
          <span className="divider">/</span>
          <span onClick={() => {
            setSelectedProductId(null);
            setCurrentTab("products");
          }}>{product.category}</span>
          <span className="divider">/</span>
          <span className="active">{product.name}</span>
        </div>
      </div>

      <div className="details-core-grid">
        {/* Gallery Section */}
        <div className="details-gallery">
          <div className="main-image-container">
            <img
              src={thumbnails[selectedImageIdx]}
              alt={product.name}
              className="details-main-image"
              style={{
                filter:
                  selectedImageIdx === 1
                    ? "hue-rotate(45deg) saturate(1.1)"
                    : selectedImageIdx === 2
                    ? "hue-rotate(220deg) contrast(1.05)"
                    : "none"
              }}
            />
          </div>
          <div className="thumbnails-grid">
            {thumbnails.map((thumb, idx) => (
              <div
                key={idx}
                className={`thumbnail-box ${selectedImageIdx === idx ? "active" : ""}`}
                onClick={() => setSelectedImageIdx(idx)}
              >
                <img
                  src={thumb}
                  alt={`View ${idx}`}
                  style={{
                    filter:
                      idx === 1
                        ? "hue-rotate(45deg) saturate(1.1)"
                        : idx === 2
                        ? "hue-rotate(220deg) contrast(1.05)"
                        : "none"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Info Panel */}
        <div className="details-info-panel">
          <span className="details-category-pill">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>

          {/* Ratings Summary */}
          <div className="details-ratings-summary">
            <div className="stars-wrapper">{renderStars(product.rating)}</div>
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Price & Stock Display */}
          <div className="details-price-row">
            <div className="details-price">${product.price.toFixed(2)}</div>
            <div className="details-stock-status">
              {product.stock > 5 ? (
                <span className="stock-badge in-stock">In Stock ({product.stock} available)</span>
              ) : product.stock > 0 ? (
                <span className="stock-badge low-stock">Low Stock (Only {product.stock} left!)</span>
              ) : (
                <span className="stock-badge out-stock">Out of Stock</span>
              )}
            </div>
          </div>

          <p className="details-long-description">{product.description}</p>

          <hr className="details-divider" />

          {/* Quantity and Action Buttons */}
          {product.stock > 0 ? (
            <div className="purchase-actions-section">
              <div className="quantity-selector-container">
                <span className="label">Quantity</span>
                <div className="quantity-counter">
                  <button className="qty-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button className="qty-btn" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="action-buttons-row">
                <button className="add-to-cart-cta" onClick={handleAddToCart}>
                  <ShoppingCart size={18} />
                  <span>Add to Shopping Cart</span>
                </button>
                <button
                  className={`wishlist-toggle-cta ${isFavorite ? "active" : ""}`}
                  onClick={handleWishlistToggle}
                  title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={20} fill={isFavorite ? "var(--danger-color)" : "transparent"} />
                </button>
              </div>
            </div>
          ) : (
            <div className="out-of-stock-alert">
              <p>This item is currently sold out. Check back soon!</p>
            </div>
          )}

          {/* Delivery & Trust Bullets */}
          <div className="details-trust-points">
            <div className="trust-point">
              <Truck size={18} />
              <div>
                <h4>Fast Courier Delivery</h4>
                <p>Arrives in 2-4 business days.</p>
              </div>
            </div>
            <div className="trust-point">
              <ShieldCheck size={18} />
              <div>
                <h4>Authenticity Guaranteed</h4>
                <p>100% genuine product direct from manufacturers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout Section */}
      <section className="details-tabs-section">
        <div className="tabs-header">
          <button className={`tab-button ${activeTab === "specs" ? "active" : ""}`} onClick={() => setActiveTab("specs")}>
            Specifications
          </button>
          <button className={`tab-button ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>
            User Reviews ({product.reviews.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "specs" ? (
            <div className="specs-tab-pane">
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-name">{key}</td>
                      <td className="spec-value">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="reviews-tab-pane">
              {product.reviews.length > 0 ? (
                <div className="reviews-list">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="review-item-card">
                      <div className="review-meta-row">
                        <div className="reviewer-name">{rev.user}</div>
                        <div className="review-date">{rev.date}</div>
                      </div>
                      <div className="review-rating-stars">{renderStars(rev.rating)}</div>
                      <p className="review-comment">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-reviews-box">
                  <p>There are no reviews written for this product yet. Be the first to review!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Products Recommendation Carousel */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-header">
            <span className="section-pre">YOU MAY ALSO LIKE</span>
            <h2 className="section-title">Related Products</h2>
            <div className="header-divider"></div>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                setCurrentTab={setCurrentTab}
                setSelectedProductId={setSelectedProductId}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
