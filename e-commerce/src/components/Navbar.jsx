import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Sun, Moon, User, LogOut, Menu, X, Search, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ currentTab, setCurrentTab, setSearchQuery }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { toggleTheme, isDark } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Monitor scroll for glassmorphic navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (setSearchQuery) {
      setSearchQuery(searchInput);
    }
    setCurrentTab("products");
    setMobileMenuOpen(false);
  };

  const navigateTo = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setShowProfileDropdown(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigateTo("home");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand" onClick={() => navigateTo("home")}>
          <Sparkles className="brand-icon" />
          <span className="brand-text">AURA<span className="brand-sub">SHOP</span></span>
        </div>

        {/* Search Bar - Desktop */}
        <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <Search size={18} />
          </button>
        </form>

        {/* Navigation Links - Desktop */}
        <div className="navbar-links-desktop">
          <button
            className={`nav-link ${currentTab === "home" ? "nav-link-active" : ""}`}
            onClick={() => navigateTo("home")}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentTab === "products" ? "nav-link-active" : ""}`}
            onClick={() => navigateTo("products")}
          >
            Shop
          </button>
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button className="action-button theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Wishlist */}
          <button className="action-button wishlist-icon" onClick={() => navigateTo("wishlist")} title="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
          </button>

          {/* Cart */}
          <button className="action-button cart-icon" onClick={() => navigateTo("cart")} title="Shopping Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="action-badge badge-primary">{cartCount}</span>}
          </button>

          {/* Auth/Profile */}
          <div className="profile-dropdown-container">
            {isAuthenticated ? (
              <div className="profile-wrapper">
                <button
                  className="action-button auth-trigger"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                {showProfileDropdown && (
                  <div className="profile-dropdown-menu">
                    <div className="dropdown-user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item" onClick={() => navigateTo("cart")}>
                      My Cart
                    </button>
                    <button className="dropdown-item" onClick={handleLogoutClick}>
                      <LogOut size={16} style={{ marginRight: 8 }} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="auth-login-btn" onClick={() => navigateTo("auth")}>
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-button">
              <Search size={18} />
            </button>
          </form>

          <div className="mobile-drawer-links">
            <button
              className={`mobile-nav-link ${currentTab === "home" ? "active" : ""}`}
              onClick={() => navigateTo("home")}
            >
              Home
            </button>
            <button
              className={`mobile-nav-link ${currentTab === "products" ? "active" : ""}`}
              onClick={() => navigateTo("products")}
            >
              Shop All Products
            </button>
            <button
              className={`mobile-nav-link ${currentTab === "wishlist" ? "active" : ""}`}
              onClick={() => navigateTo("wishlist")}
            >
              Wishlist ({wishlistCount})
            </button>
            <button
              className={`mobile-nav-link ${currentTab === "cart" ? "active" : ""}`}
              onClick={() => navigateTo("cart")}
            >
              Cart ({cartCount})
            </button>

            <hr className="mobile-divider" />

            {isAuthenticated ? (
              <div className="mobile-auth-section">
                <p className="mobile-user-greeting">Logged in as <strong>{user.name}</strong></p>
                <button className="mobile-logout-btn" onClick={handleLogoutClick}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button className="mobile-login-btn" onClick={() => navigateTo("auth")}>
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
