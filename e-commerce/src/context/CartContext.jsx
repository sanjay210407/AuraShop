import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("ecom_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [promoCode, setPromoCode] = useState(() => {
    return localStorage.getItem("ecom_promo") || "";
  });

  const [discountPercent, setDiscountPercent] = useState(() => {
    const pct = localStorage.getItem("ecom_promo_pct");
    return pct ? parseFloat(pct) : 0;
  });

  useEffect(() => {
    localStorage.setItem("ecom_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("ecom_promo", promoCode);
    localStorage.setItem("ecom_promo_pct", discountPercent.toString());
  }, [promoCode, discountPercent]);

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // limit quantity based on stock if specified
        const newQty = existing.quantity + qty;
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: product.stock ? Math.min(newQty, product.stock) : newQty }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      const stock = item?.stock || 999;
      const targetQty = Math.min(quantity, stock);

      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: targetQty } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "SAVE20") {
      setPromoCode("SAVE20");
      setDiscountPercent(20);
      return { success: true, message: "20% discount applied successfully!" };
    } else if (cleanCode === "WELCOME10") {
      setPromoCode("WELCOME10");
      setDiscountPercent(10);
      return { success: true, message: "10% discount applied successfully!" };
    } else {
      return { success: false, message: "Invalid promo code" };
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
  };

  // Perform calculations with useMemo
  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const discount = (subtotal * discountPercent) / 100;
    
    // Free shipping above $100, otherwise $9.99
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
    
    // 8% Sales Tax
    const tax = (subtotal - discount) * 0.08;
    
    const total = subtotal - discount + shipping + tax;

    return {
      subtotal,
      cartCount,
      discount,
      shipping,
      tax,
      total,
      promoCode,
      discountPercent
    };
  }, [cart, discountPercent, promoCode]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        ...totals
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
