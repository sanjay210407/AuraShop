import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ArrowRight, CreditCard, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Checkout({ setCurrentTab, setLastOrderDetails }) {
  const { cart, subtotal, discount, shipping, tax, total, clearCart, promoCode } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  // Shipping Form States
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    phone: ""
  });

  // Payment Form States
  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  // Form input helper
  const handleShippingChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handlePaymentChange = (e) => {
    let { name, value } = e.target;

    // Custom formatting for card number & expiry
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").substring(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits
    } else if (name === "expiry") {
      value = value.replace(/\D/g, "").substring(0, 4);
      if (value.length >= 3) {
        value = `${value.substring(0, 2)}/${value.substring(2)}`;
      }
    } else if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 4);
    }

    setPaymentForm({ ...paymentForm, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Field validation
  const validateShipping = () => {
    const newErrors = {};
    if (!shippingForm.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shippingForm.address.trim()) newErrors.address = "Shipping address is required";
    if (!shippingForm.city.trim()) newErrors.city = "City is required";
    if (!shippingForm.postalCode.trim()) newErrors.postalCode = "Postal/Zip code is required";
    if (!shippingForm.phone.trim()) newErrors.phone = "Phone number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!paymentForm.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    if (paymentForm.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }
    const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryPattern.test(paymentForm.expiry)) {
      newErrors.expiry = "Use format MM/YY";
    }
    if (paymentForm.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step transitions
  const handleNextStep = () => {
    if (step === 1) {
      if (validateShipping()) setStep(2);
    } else if (step === 2) {
      if (validatePayment()) setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // Handle Order Placement
  const handlePlaceOrder = () => {
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 3);

    const orderDetails = {
      orderId,
      items: [...cart],
      shipping: { ...shippingForm },
      payment: {
        lastFour: paymentForm.cardNumber.slice(-4),
        cardName: paymentForm.cardName
      },
      pricing: {
        subtotal,
        discount,
        shipping,
        tax,
        total,
        promoCode
      },
      deliveryEstimate: deliveryDate.toDateString()
    };

    // Store in parent state
    setLastOrderDetails(orderDetails);
    
    // Clear shopping cart context
    clearCart();

    showToast("Order placed successfully!", "success");
    setCurrentTab("order-confirmation");
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="checkout-page empty text-center">
        <p>No items inside checkout.</p>
        <button className="back-btn" onClick={() => setCurrentTab("cart")}>
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page fade-in">
      {/* Checkout Stepper Progress */}
      <div className="checkout-stepper-header">
        <div className={`step-node ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
          <div className="step-number">{step > 1 ? "✓" : "1"}</div>
          <span>Shipping</span>
        </div>
        <div className="step-bar-connector"></div>
        <div className={`step-node ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
          <div className="step-number">{step > 2 ? "✓" : "2"}</div>
          <span>Payment</span>
        </div>
        <div className="step-bar-connector"></div>
        <div className={`step-node ${step >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span>Review</span>
        </div>
      </div>

      <div className="checkout-content-grid">
        {/* Step Inputs Columns */}
        <div className="checkout-inputs-column">
          {step === 1 && (
            <div className="checkout-step-card">
              <h2>Shipping Address</h2>
              <p className="card-subtitle">Please fill out the destination details below.</p>
              <hr className="divider" />
              <div className="checkout-form-grid">
                <div className="form-input-group full-width">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingForm.fullName}
                    onChange={handleShippingChange}
                    className={errors.fullName ? "input-error" : ""}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>
                <div className="form-input-group full-width">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingForm.address}
                    onChange={handleShippingChange}
                    className={errors.address ? "input-error" : ""}
                    placeholder="123 Main St, Apt 4B"
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                <div className="form-input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingForm.city}
                    onChange={handleShippingChange}
                    className={errors.city ? "input-error" : ""}
                    placeholder="San Francisco"
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>
                <div className="form-input-group">
                  <label>Postal / Zip Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingForm.postalCode}
                    onChange={handleShippingChange}
                    className={errors.postalCode ? "input-error" : ""}
                    placeholder="94103"
                  />
                  {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                </div>
                <div className="form-input-group">
                  <label>Country</label>
                  <select name="country" value={shippingForm.country} onChange={handleShippingChange}>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={shippingForm.phone}
                    onChange={handleShippingChange}
                    className={errors.phone ? "input-error" : ""}
                    placeholder="(555) 000-0000"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="step-actions-row single">
                <button className="step-action-btn next" onClick={handleNextStep}>
                  <span>Continue to Payment</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-step-card">
              <h2>Secure Payment Method</h2>
              <p className="card-subtitle">Encrypted SSL checkout. No actual money is charged.</p>
              <hr className="divider" />
              <div className="checkout-form-grid">
                <div className="form-input-group full-width">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentForm.cardName}
                    onChange={handlePaymentChange}
                    className={errors.cardName ? "input-error" : ""}
                    placeholder="JOHN DOE"
                  />
                  {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                </div>
                <div className="form-input-group full-width">
                  <label>Credit Card Number</label>
                  <div className="card-input-wrapper">
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentForm.cardNumber}
                      onChange={handlePaymentChange}
                      className={errors.cardNumber ? "input-error" : ""}
                      placeholder="0000 0000 0000 0000"
                    />
                    <CreditCard size={18} className="card-logo-placeholder" />
                  </div>
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>
                <div className="form-input-group">
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={paymentForm.expiry}
                    onChange={handlePaymentChange}
                    className={errors.expiry ? "input-error" : ""}
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <span className="error-text">{errors.expiry}</span>}
                </div>
                <div className="form-input-group">
                  <label>CVV Code</label>
                  <input
                    type="password"
                    name="cvv"
                    value={paymentForm.cvv}
                    onChange={handlePaymentChange}
                    className={errors.cvv ? "input-error" : ""}
                    placeholder="•••"
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>

              <div className="step-actions-row double">
                <button className="step-action-btn back" onClick={handlePrevStep}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button className="step-action-btn next" onClick={handleNextStep}>
                  <span>Review Order Summary</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-step-card">
              <h2>Review Your Order</h2>
              <p className="card-subtitle">Confirm final shipping and payment summaries.</p>
              <hr className="divider" />

              <div className="summary-review-details">
                <div className="review-section-box">
                  <div className="box-header">
                    <Truck size={18} />
                    <h4>Shipping To</h4>
                  </div>
                  <p><strong>{shippingForm.fullName}</strong></p>
                  <p>{shippingForm.address}, {shippingForm.city}</p>
                  <p>{shippingForm.postalCode}, {shippingForm.country}</p>
                  <p>Phone: {shippingForm.phone}</p>
                </div>

                <div className="review-section-box">
                  <div className="box-header">
                    <CreditCard size={18} />
                    <h4>Paying With</h4>
                  </div>
                  <p>Cardholder: {paymentForm.cardName}</p>
                  <p>Card Number: •••• •••• •••• {paymentForm.cardNumber.slice(-4)}</p>
                </div>
              </div>

              <div className="step-actions-row double">
                <button className="step-action-btn back" onClick={handlePrevStep}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button className="step-action-btn place-order" onClick={handlePlaceOrder}>
                  <ShieldCheck size={18} />
                  <span>Confirm & Place Order</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing/Checkout Items column */}
        <div className="checkout-summary-column">
          <div className="summary-card">
            <h3>Cart Summary</h3>
            <hr className="summary-divider" />

            <div className="checkout-items-mini-list">
              {cart.map((item) => (
                <div key={item.id} className="mini-item-row">
                  <img src={item.image} alt={item.name} />
                  <div className="mini-item-details">
                    <p className="name">{item.name}</p>
                    <p className="qty-price">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            <div className="summary-row">
              <span className="label">Subtotal</span>
              <span className="value">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span className="label">Discount</span>
                <span className="value">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span className="label">Shipping</span>
              <span className="value">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="summary-row">
              <span className="label">Sales Tax</span>
              <span className="value">${tax.toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total">
              <span className="label">Grand Total</span>
              <span className="value">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
