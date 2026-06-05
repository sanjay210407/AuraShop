import React from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist({ setCurrentTab, setSelectedProductId }) {
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page fade-in empty-cart-container">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-wrapper wishlist-empty">
            <Heart size={48} />
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>You haven't saved any items to your wishlist yet. Explore our curated collections to add your favorites!</p>
          <button className="empty-cart-btn" onClick={() => setCurrentTab("products")}>
            Discover Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page fade-in">
      <div className="page-header-banner mini">
        <h1>My Favorites</h1>
        <p>Curate your ideal collection and add items straight to your cart.</p>
      </div>

      <div className="wishlist-container">
        <div className="wishlist-header-row">
          <h3>Saved Items ({wishlist.length})</h3>
          <button className="clear-cart-text-btn" onClick={clearWishlist}>
            <Trash2 size={14} />
            <span>Clear Wishlist</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setCurrentTab={setCurrentTab}
              setSelectedProductId={setSelectedProductId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
