import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, user } = useShop();
  const navigate = useNavigate();

  if (!user) {
    return <p>Please <Link to="/login">login</Link> to access your cart.</p>;
  }

  return (
    <section>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          {cart.items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <h4>{item.product.name}</h4>
                <p>${item.product.price.toFixed(2)}</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => updateCartQuantity(item.product.id, Number(event.target.value))}
              />
              <strong>${item.subtotal.toFixed(2)}</strong>
              <button type="button" className="btn-secondary" onClick={() => removeFromCart(item.product.id)}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${cart.total.toFixed(2)}</h3>
          <button type="button" onClick={() => navigate('/checkout')}>Checkout</button>
        </>
      )}
    </section>
  );
}

export default CartPage;
