# 🛒 AuraShop — Modern E-Commerce Web App

🚀 **Live Demo:** https://aurashop1.netlify.app

---

## 🌟 Overview

**AuraShop** is a premium, fully dynamic, and highly optimized e-commerce web application built from scratch using modern frontend technologies.

It delivers a smooth, app-like experience with advanced UI interactions, performance optimizations, and a scalable architecture.

> Designed to simulate a real-world e-commerce platform with production-level features and clean engineering practices.

---

## ✨ Key Features

### 🎨 UI/UX

* 🌗 Light / Dark mode with persistent theme memory
* 💎 Glassmorphism-based modern UI design
* ⚡ Smooth animations and transitions
* 🔔 Custom toast notification queue system

---

### 🛍️ E-Commerce Functionalities

* 🛒 Fully functional cart system with quantity control
* ❤️ Wishlist (favorites toggle system)
* 💳 Multi-step checkout flow
* 🧾 Order confirmation with dynamic order ID & delivery estimation
* 🎟️ Coupon system:

  * `SAVE20` → 20% discount
  * `WELCOME10` → 10% discount

---

### 🔐 Authentication

* Simulated login & registration system
* Input validation with regex
* Persistent user session using local storage

---

## 🧠 Architecture

Well-structured and scalable folder system:

```
src/
│
├── data/
│   └── products.js
│
├── services/
│   └── api.js
│
├── context/
│   ├── ThemeContext.jsx
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── ToastContext.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── SkeletonLoader.jsx
│   └── HeroSection.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirmation.jsx
│   └── Auth.jsx
```

---

## ⚡ Performance Optimizations

* 🚀 **Code Splitting:** Lazy loading with `React.lazy` & `Suspense`
* 🧠 **Memoization:** `React.memo` to prevent unnecessary re-renders
* 📊 **Efficient Calculations:** `useMemo` for cart totals & discounts
* 🔁 **Stable Functions:** `useCallback` for optimized handlers

---

## ⚙️ Tech Stack

* ⚛️ React (Vite)
* 🎨 CSS (Custom styling)
* 📦 Context API (State management)
* 🌐 Netlify (Deployment)

---

## 🧪 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/AuraShop.git

# Navigate to project
cd AuraShop/e-commerce

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🏗️ Build

```bash
npm run build
```

---

## 🧭 Walkthrough

1. Toggle between **Light/Dark mode**
2. Browse products and view details
3. Add items to **Cart / Wishlist**
4. Apply coupon codes:

   * `SAVE20`
   * `WELCOME10`
5. Complete checkout process
6. View order confirmation page 🎉

---

## 📈 Future Improvements

* 🔗 Backend integration (Node.js + MongoDB)
* 💳 Payment gateway (Stripe / Razorpay)
* 📦 Order tracking system
* 🔍 Advanced search & filters

---

## 🙌 Author

Built with passion by **Sanjay**

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

> “Not just a project — this is a full-stack mindset in action.”
