import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { fetchProducts, fetchCategories } from "../services/api";
import { SlidersHorizontal, Search, RotateCcw, LayoutGrid, List, X, Star } from "lucide-react";

export default function Products({
  setCurrentTab,
  setSelectedProductId,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery
}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter & Sort States
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || "All");
  const [searchVal, setSearchVal] = useState(searchQuery || "");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 400 });
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Sync prop states to internal state
  useEffect(() => {
    if (filterCategory) {
      setSelectedCategory(filterCategory);
    }
  }, [filterCategory]);

  useEffect(() => {
    if (searchQuery !== undefined) {
      setSearchVal(searchQuery);
    }
  }, [searchQuery]);

  // Load Categories list on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, []);

  // Fetch Products based on internal states
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        search: searchVal,
        category: selectedCategory,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sortBy: sortBy === "default" ? "" : sortBy
      });
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }, [searchVal, selectedCategory, priceRange, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Reset Filters handler
  const handleResetFilters = () => {
    setSelectedCategory("All");
    if (setFilterCategory) setFilterCategory("All");
    setSearchVal("");
    if (setSearchQuery) setSearchQuery("");
    setPriceRange({ min: 0, max: 400 });
    setSortBy("default");
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (setFilterCategory) setFilterCategory(cat);
  };

  // Performance Optimization: Check if products grid list is empty
  const hasProducts = products.length > 0;

  return (
    <div className="products-page fade-in">
      <div className="page-header-banner">
        <h1>Explore Aura Collection</h1>
        <p>Premium aesthetics tailored to your modern workspace and luxury style.</p>
      </div>

      <div className="products-layout-container">
        {/* Sidebar Filters - Desktop */}
        <aside className={`filters-sidebar ${showMobileFilters ? "mobile-visible" : ""}`}>
          <div className="filters-sidebar-header">
            <h3>Filters</h3>
            <button className="reset-all-btn" onClick={handleResetFilters}>
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
            <button className="mobile-filters-close" onClick={() => setShowMobileFilters(false)}>
              <X size={20} />
            </button>
          </div>

          <hr className="filter-divider" />

          {/* Search Bar filter */}
          <div className="filter-group">
            <label>Search</label>
            <div className="filter-search-wrapper">
              <input
                type="text"
                value={searchVal}
                placeholder="Find something..."
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  if (setSearchQuery) setSearchQuery(e.target.value);
                }}
              />
              <Search size={16} className="search-icon-inside" />
            </div>
          </div>

          {/* Categories select list */}
          <div className="filter-group">
            <label>Category</label>
            <div className="category-filter-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-filter-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <label>Price Range (Max: ${priceRange.max})</label>
            <input
              type="range"
              min="0"
              max="400"
              step="10"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
              className="price-range-slider"
            />
            <div className="price-inputs-row">
              <span>$0</span>
              <span>${priceRange.max}</span>
            </div>
          </div>
        </aside>

        {/* Products Grid Content */}
        <main className="products-main-content">
          {/* Controls Bar */}
          <div className="products-controls-bar">
            {/* Mobile filter toggle */}
            <button className="mobile-filters-toggle" onClick={() => setShowMobileFilters(true)}>
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            {/* Results count info */}
            <div className="results-count-text">
              Showing <strong>{products.length}</strong> products
            </div>

            {/* Sorting and Layout selections */}
            <div className="sorting-layout-controls">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-dropdown">
                <option value="default">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="layout-toggle-buttons">
                <button
                  className={`layout-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  className={`layout-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List View"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Current Filters Tags Bar */}
          {(selectedCategory !== "All" || searchVal !== "" || priceRange.max < 400) && (
            <div className="active-tags-container">
              {selectedCategory !== "All" && (
                <span className="filter-tag">
                  Category: {selectedCategory}
                  <button onClick={() => handleCategorySelect("All")}>&times;</button>
                </span>
              )}
              {searchVal !== "" && (
                <span className="filter-tag">
                  Search: "{searchVal}"
                  <button onClick={() => {
                    setSearchVal("");
                    if (setSearchQuery) setSearchQuery("");
                  }}>&times;</button>
                </span>
              )}
              {priceRange.max < 400 && (
                <span className="filter-tag">
                  Price: &le; ${priceRange.max}
                  <button onClick={() => setPriceRange({ ...priceRange, max: 400 })}>&times;</button>
                </span>
              )}
              <button className="clear-all-tags-btn" onClick={handleResetFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Listing Grid */}
          {loading ? (
            <SkeletonLoader type="grid" count={6} />
          ) : hasProducts ? (
            <div className={`products-${viewMode === "grid" ? "grid" : "list-layout"}`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  setCurrentTab={setCurrentTab}
                  setSelectedProductId={setSelectedProductId}
                />
              ))}
            </div>
          ) : (
            <div className="no-products-fallback">
              <SlidersHorizontal size={48} className="no-products-icon" />
              <h3>No products found</h3>
              <p>We couldn't find any items matching your selected filter combination.</p>
              <button className="fallback-reset-btn" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
