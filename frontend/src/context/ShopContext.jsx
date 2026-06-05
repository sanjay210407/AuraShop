/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import api from '../services/api';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('aurashop-theme') || 'light');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('aurashop-theme', next);
    document.body.dataset.theme = next;
  }, [theme]);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/products', { params });
      setProducts(data.products || []);
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    const { data } = await api.post('/users/login', payload);
    setUser(data.user);
  };

  const signup = async (payload) => {
    const { data } = await api.post('/users/signup', payload);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post('/users/logout');
    setUser(null);
    setCart({ items: [], total: 0 });
  };

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await api.post('/cart', { productId, quantity });
    setCart(data);
  };

  const updateCartQuantity = async (productId, quantity) => {
    const { data } = await api.patch(`/cart/${productId}`, { quantity });
    setCart(data);
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/${productId}`);
    setCart(data);
  };

  const checkout = async (payload) => {
    const { data } = await api.post('/orders', payload);
    setOrders((prev) => [data.order, ...prev]);
    setCart({ items: [], total: 0 });
    return data.order;
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId)
      ? prev.filter((id) => id !== productId)
      : [...prev, productId]));
  };

  useEffect(() => {
    const hydrate = async () => {
      setLoading(true);
      try {
        const [productsResponse, sessionResponse] = await Promise.all([
          api.get('/products'),
          api.get('/users/me').catch(() => ({ data: { user: null } }))
        ]);
        setProducts(productsResponse.data.products || []);
        setUser(sessionResponse.data.user || null);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (user) {
      const hydrateUserData = async () => {
        const [cartResponse, orderResponse] = await Promise.all([
          api.get('/cart').catch(() => ({ data: { items: [], total: 0 } })),
          api.get('/orders').catch(() => ({ data: { orders: [] } }))
        ]);

        setCart(cartResponse.data);
        setOrders(orderResponse.data.orders || []);
      };

      hydrateUserData();
    }
  }, [user]);

  const value = useMemo(() => ({
    user,
    products,
    cart,
    orders,
    wishlist,
    theme,
    loading,
    fetchProducts,
    login,
    signup,
    logout,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    checkout,
    toggleWishlist,
    toggleTheme
  }), [user, products, cart, orders, wishlist, theme, loading, toggleTheme]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
