import React, { useState, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";
import "./App.css";

// Lazy Loaded Pages
const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const OrderConfirmation = React.lazy(() => import("./pages/OrderConfirmation"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));

// Full-screen spinner for lazy suspense fallback
function FullPageSpinner() {
  return (
    <div className="full-page-spinner-container">
      <div className="aura-pulse-circle"></div>
      <p className="loading-text">Loading Aura Shop...</p>
    </div>
  );
}

function AppContent() {
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Tab Router selection handler
  const renderTab = () => {
    switch (currentTab) {
      case "home":
        return (
          <Home
            setCurrentTab={setCurrentTab}
            setSelectedProductId={setSelectedProductId}
            setFilterCategory={setFilterCategory}
            setSearchQuery={setSearchQuery}
          />
        );
      case "products":
        return (
          <Products
            setCurrentTab={setCurrentTab}
            setSelectedProductId={setSelectedProductId}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case "product-details":
        return (
          <ProductDetails
            productId={selectedProductId}
            setCurrentTab={setCurrentTab}
            setSelectedProductId={setSelectedProductId}
          />
        );
      case "cart":
        return <Cart setCurrentTab={setCurrentTab} />;
      case "checkout":
        return <Checkout setCurrentTab={setCurrentTab} setLastOrderDetails={setLastOrderDetails} />;
      case "order-confirmation":
        return <OrderConfirmation orderDetails={lastOrderDetails} setCurrentTab={setCurrentTab} />;
      case "auth":
        return <Auth setCurrentTab={setCurrentTab} />;
      case "wishlist":
        return <Wishlist setCurrentTab={setCurrentTab} setSelectedProductId={setSelectedProductId} />;
      default:
        return (
          <Home
            setCurrentTab={setCurrentTab}
            setSelectedProductId={setSelectedProductId}
            setFilterCategory={setFilterCategory}
            setSearchQuery={setSearchQuery}
          />
        );
    }
  };

  return (
    <div className="app-wrapper">
      {/* Sticky Floating Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Pages Content area with code split suspense */}
      <main className="app-main-content">
        <Suspense fallback={<FullPageSpinner />}>
          {renderTab()}
        </Suspense>
      </main>

      {/* Responsive Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
