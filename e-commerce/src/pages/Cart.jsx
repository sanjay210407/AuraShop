import React, { useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, Ticket, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Cart({ setCurrentTab }) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    promoCode,
    discountPercent
  } = useCart();

  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (res.success) {
      showToast(res.message, "success");
      setPromoInput("");
    } else {
      showToast(res.message, "error");
    }
  };

  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      setCurrentTab("checkout");
    } else {
      showToast("Please sign in to complete your checkout.", "info");
      // Redirect to Auth, with intent to checkout afterwards
      setCurrentTab("auth");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page fade-in empty-cart-container">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-wrapper">
            <ShoppingBag size={48} />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>It looks like you haven't added any products to your cart yet. Head over to our catalog to discover curated aesthetics.</p>
          <button className="empty-cart-btn" onClick={() => setCurrentTab("products")}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page fade-in">
      <div className="page-header-banner mini">
        <h1>Shopping Cart</h1>
        <p>Review items, adjust quantities, and proceed to checkout.</p>
      </div>

      <div className="cart-content-grid">
        {/* Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-column-header">
            <h3>Cart Items</h3>
            <button className="clear-cart-text-btn" onClick={clearCart}>
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />

                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.category}</span>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price-each">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="cart-item-actions-row">
                    {/* Quantity Controls */}
                    <div className="quantity-counter compact">
                      <button
                        className="qty-btn compact"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-value compact">{item.quantity}</span>
                      <button
                        className="qty-btn compact"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.stock || 999)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Cost & Delete */}
                    <div className="item-cost-wrapper">
                      <div className="item-subtotal-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        className="item-delete-btn"
                        onClick={() => {
                          removeFromCart(item.id);
                          showToast(`${item.name} removed from cart.`, "info");
                        }}
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="continue-shopping-btn" onClick={() => setCurrentTab("products")}>
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Order Pricing Summary */}
        <div className="cart-summary-column">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <hr className="summary-divider" />

            <div className="summary-row">
              <span className="label">Subtotal</span>
              <span className="value">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span className="label">Discount ({discountPercent}%)</span>
                <span className="value">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span className="label">Estimated Shipping</span>
              <span className="value">
                {shipping === 0 ? <strong className="shipping-free">FREE</strong> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row">
              <span className="label">Sales Tax (8%)</span>
              <span className="value">${tax.toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total">
              <span className="label">Total Amount</span>
              <span className="value">${total.toFixed(2)}</span>
            </div>

            {/* Promo Code Form */}
            <div className="promo-code-container">
              {promoCode ? (
                <div className="active-promo-badge">
                  <div className="promo-badge-text">
                    <Ticket size={16} />
                    <span>Promo: <strong>{promoCode}</strong> applied</span>
                  </div>
                  <button className="remove-promo-btn" onClick={removePromoCode}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <input
                    type="text"
                    placeholder="Enter Coupon (SAVE20, WELCOME10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit" className="apply-promo-btn">Apply</button>
                </form>
              )}
            </div>

            <button className="checkout-cta-btn" onClick={handleCheckoutClick}>
              Proceed to Secure Checkout
            </button>

            {shipping > 0 && (
              <p className="shipping-hint-text">
                Add <strong>${(100 - subtotal).toFixed(2)}</strong> more to unlock <strong>FREE SHIPPING</strong>!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
