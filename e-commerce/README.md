# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



e-commerce/
 ├── index.html                  # Main HTML Entry & SEO Meta Tags
 ├── vite.config.js              # Vite bundler configuration
 ├── package.json                # Project dependencies (React 19, Lucide Icons)
 ├── src/
 │    ├── main.jsx               # React DOM render script
 │    ├── App.jsx                # Router, Lazy Loading, Context Wrappers
 │    ├── App.css                # Style overrides placeholder
 │    ├── index.css              # Central Styling Sheet (Variables, Theme, Animations)
 │    ├── assets/                # Core visual assets
 │    ├── data/
 │    │    └── products.js       # Product database array (specifications, user reviews)
 │    ├── services/
 │    │    └── api.js            # Simulated asynchronous API endpoints
 │    ├── context/
 │    │    ├── ThemeContext.jsx  # Dark/Light mode class triggers
 │    │    ├── AuthContext.jsx   # Persistence mock sign-in, login, and registration
 │    │    ├── CartContext.jsx   # Shopping cart and coupon calculations
 │    │    ├── WishlistContext.jsx# Favorites toggle
 │    │    └── ToastContext.jsx  # Global custom notification actions
 │    ├── components/
 │    │    ├── Navbar.jsx        # Responsive navigation, counts, profile menu
 │    │    ├── Footer.jsx        # Multi-column footer & newsletter forms
 │    │    ├── ProductCard.jsx   # Memoized product cards, stock alerts
 │    │    ├── HeroSection.jsx   # Transition-rich slider
 │    │    └── SkeletonLoader.jsx# Glowing pulsing shimmers
 │    └── pages/
 │         ├── Home.jsx           # Value grids & trending grid
 │         ├── Products.jsx       # Catalog listing page, filters, grid/list toggle
 │         ├── ProductDetails.jsx # Detailed pages, specs table, related recommendations
 │         ├── Cart.jsx           # Order items list, coupon checks
 │         ├── Checkout.jsx       # Multi-step checkout form, input masks
 │         ├── OrderConfirmation.jsx # Animated checkmark, delivery date estimates
 │         └── Auth.jsx           # Sign-in/Sign-up tabbed validator panels