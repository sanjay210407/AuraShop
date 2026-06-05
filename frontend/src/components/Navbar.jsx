import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function Navbar() {
  const { user, cart, logout, theme, toggleTheme } = useShop();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link to="/" className="brand">AuraShop</Link>
      <nav>
        <NavLink to="/">Products</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
      </nav>
      <div className="navbar-actions">
        <button type="button" className="btn-secondary" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        {user ? (
          <button type="button" className="btn-secondary" onClick={onLogout}>Logout</button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
