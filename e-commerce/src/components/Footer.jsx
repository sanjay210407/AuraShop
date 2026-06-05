import React, { useState } from "react";
import { Sparkles, Mail, Send, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Footer({ setCurrentTab }) {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Thank you for subscribing to our newsletter!", "success");
    setEmail("");
  };

  return (
    <footer className="footer">
      {/* Trust Badges */}
      <div className="footer-badges">
        <div className="badge-item">
          <div className="badge-icon-wrapper">
            <Truck size={24} />
          </div>
          <div className="badge-text-wrapper">
            <h4>Free Shipping</h4>
            <p>On all orders over $100</p>
          </div>
        </div>
        <div className="badge-item">
          <div className="badge-icon-wrapper">
            <RefreshCw size={24} />
          </div>
          <div className="badge-text-wrapper">
            <h4>30-Day Returns</h4>
            <p>100% money-back guarantee</p>
          </div>
        </div>
        <div className="badge-item">
          <div className="badge-icon-wrapper">
            <ShieldCheck size={24} />
          </div>
          <div className="badge-text-wrapper">
            <h4>Secure Payments</h4>
            <p>SSL encrypted transactions</p>
          </div>
        </div>
      </div>

      <div className="footer-content">
        {/* Brand Description */}
        <div className="footer-column brand-column">
          <div className="footer-brand" onClick={() => setCurrentTab("home")}>
            <Sparkles className="brand-icon" />
            <span className="brand-text">AURA<span className="brand-sub">SHOP</span></span>
          </div>
          <p className="brand-description">
            AuraShop offers high-end products curated for quality, style, and everyday functionality. Experience seamless retail therapy designed for modern lives.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Pinterest</a>
          </div>
        </div>

        {/* Shop Navigation links */}
        <div className="footer-column">
          <h3>Categories</h3>
          <ul className="footer-links-list">
            <li><button onClick={() => setCurrentTab("products")}>Electronics</button></li>
            <li><button onClick={() => setCurrentTab("products")}>Fashion</button></li>
            <li><button onClick={() => setCurrentTab("products")}>Home & Living</button></li>
            <li><button onClick={() => setCurrentTab("products")}>Fitness & Outdoors</button></li>
          </ul>
        </div>

        {/* Support links */}
        <div className="footer-column">
          <h3>Customer Service</h3>
          <ul className="footer-links-list">
            <li><a href="#">Contact Support</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-column newsletter-column">
          <h3>Stay In The Loop</h3>
          <p>Subscribe to receive special offers, new product launches, and exclusive discount codes.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Copy and policies */}
      <div className="footer-bottom">
        <p>&copy; 2026 AuraShop. All rights reserved. Made with love for premium interfaces.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
