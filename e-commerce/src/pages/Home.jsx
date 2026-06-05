import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchProducts } from "../services/api";
import { Award, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

export default function Home({ setCurrentTab, setSelectedProductId, setFilterCategory, setSearchQuery }) {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        // Fetch products and filter high rated ones
        const allProducts = await fetchProducts();
        const trending = allProducts
          .filter((p) => p.rating >= 4.8)
          .slice(0, 4); // Take top 4 trending items
        setTrendingProducts(trending);
      } catch (err) {
        console.error("Failed to load trending products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (setFilterCategory) {
      setFilterCategory(categoryName);
    }
    if (setSearchQuery) {
      setSearchQuery(""); // Clear search queries
    }
    setCurrentTab("products");
  };

  const categories = [
    { name: "Electronics", icon: "💻", count: "3 Products", bg: "rgba(99, 102, 241, 0.1)" },
    { name: "Fashion", icon: "🧥", count: "3 Products", bg: "rgba(236, 72, 153, 0.1)" },
    { name: "Home & Living", icon: "🏠", count: "3 Products", bg: "rgba(245, 158, 11, 0.1)" },
    { name: "Fitness & Outdoors", icon: "🏃", count: "3 Products", bg: "rgba(16, 185, 129, 0.1)" }
  ];

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <HeroSection setCurrentTab={setCurrentTab} setSearchQuery={setSearchQuery} />

      {/* Featured Core Value Cards */}
      <section className="features-grid-container">
        <div className="feature-grid-item">
          <Award className="feature-grid-icon" />
          <h3>Premium Quality</h3>
          <p>Handpicked, high-end materials designed to deliver outstanding longevity.</p>
        </div>
        <div className="feature-grid-item">
          <TrendingUp className="feature-grid-icon" />
          <h3>Aesthetic Excellence</h3>
          <p>Carefully balanced designs merging ergonomic structures and minimalist aesthetics.</p>
        </div>
        <div className="feature-grid-item">
          <ShieldAlert className="feature-grid-icon" />
          <h3>Direct Warranties</h3>
          <p>Enjoy piece of mind with our lifetime guarantee and 24/7 dedicated support.</p>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-pre">EXPLORE COLLECTIONS</span>
          <h2 className="section-title">Shop by Category</h2>
          <div className="header-divider"></div>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              style={{ "--card-accent": cat.bg }}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="category-emoji-wrapper">{cat.icon}</div>
              <div className="category-details">
                <h3>{cat.name}</h3>
                <p>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Grid */}
      <section className="trending-section">
        <div className="section-header">
          <span className="section-pre">CUSTOMER FAVORITES</span>
          <h2 className="section-title">Trending Now</h2>
          <div className="header-divider"></div>
        </div>

        {loading ? (
          <SkeletonLoader type="grid" count={4} />
        ) : (
          <div className="products-grid">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setCurrentTab={setCurrentTab}
                setSelectedProductId={setSelectedProductId}
              />
            ))}
          </div>
        )}

        <div className="home-explore-all-wrapper">
          <button className="explore-all-btn" onClick={() => handleCategoryClick("All")}>
            View Entire Catalog
          </button>
        </div>
      </section>
    </div>
  );
}
