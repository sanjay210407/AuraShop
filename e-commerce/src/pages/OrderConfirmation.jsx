import React, { useEffect } from "react";
import { CheckCircle2, ShoppingBag, Truck, Calendar, ArrowRight } from "lucide-react";

export default function OrderConfirmation({ orderDetails, setCurrentTab }) {
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderDetails) {
    return (
      <div className="order-confirmation-page empty fade-in text-center">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-wrapper error">
            <ShoppingBag size={48} />
          </div>
          <h2>No Order Found</h2>
          <p>It looks like you haven't placed an order in this session. Head to our store to add items!</p>
          <button className="empty-cart-btn" onClick={() => setCurrentTab("products")}>
            Shop Catalog
          </button>
        </div>
      </div>
    );
  }

  const { orderId, items, shipping, payment, pricing, deliveryEstimate } = orderDetails;

  return (
    <div className="order-confirmation-page fade-in">
      <div className="order-confirmation-card">
        {/* Animated Success Icon Header */}
        <div className="success-icon-container">
          <CheckCircle2 size={64} className="success-checkmark-icon" />
          <h2>Order Confirmed!</h2>
          <p className="order-number-subtitle">Order ID: <strong>{orderId}</strong></p>
          <p className="thank-you-note">Thank you for your purchase. We've sent a detailed receipt and tracking link to your email.</p>
        </div>

        <hr className="divider" />

        {/* Dynamic Delivery Estimate and Carrier details */}
        <div className="delivery-estimate-card">
          <div className="estimate-row">
            <Calendar size={20} className="estimate-icon" />
            <div>
              <p className="label">Estimated Delivery</p>
              <h4>{deliveryEstimate}</h4>
            </div>
          </div>
          <div className="estimate-row">
            <Truck size={20} className="estimate-icon" />
            <div>
              <p className="label">Carrier Method</p>
              <h4>Aura Express Courier</h4>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Receipt items list breakdown */}
        <div className="confirmation-items-breakdown">
          <h3>Order Details</h3>
          <div className="confirmation-items-list">
            {items.map((item) => (
              <div key={item.id} className="confirm-item-row">
                <span className="qty">{item.quantity}x</span>
                <span className="name">{item.name}</span>
                <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="divider compact" />

          {/* Pricing Totals breakdown */}
          <div className="confirm-pricing-grid">
            <div className="pricing-row">
              <span>Subtotal:</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>
            {pricing.discount > 0 && (
              <div className="pricing-row discount">
                <span>Discount ({pricing.promoCode}):</span>
                <span>-${pricing.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="pricing-row">
              <span>Shipping:</span>
              <span>{pricing.shipping === 0 ? "FREE" : `$${pricing.shipping.toFixed(2)}`}</span>
            </div>
            <div className="pricing-row">
              <span>Sales Tax:</span>
              <span>${pricing.tax.toFixed(2)}</span>
            </div>
            <hr className="divider compact" />
            <div className="pricing-row total">
              <span>Total Paid:</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Address and Card info */}
        <div className="confirmation-addresses-row">
          <div className="address-box">
            <h4>Shipping Destination</h4>
            <p><strong>{shipping.fullName}</strong></p>
            <p>{shipping.address}</p>
            <p>{shipping.city}, {shipping.postalCode}</p>
            <p>{shipping.country}</p>
          </div>
          <div className="address-box">
            <h4>Payment Method</h4>
            <p>Credit Card Ending in •••• {payment.lastFour}</p>
            <p>Cardholder Name: {payment.cardName}</p>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="confirmation-actions-row">
          <button className="confirm-shop-btn" onClick={() => setCurrentTab("products")}>
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
