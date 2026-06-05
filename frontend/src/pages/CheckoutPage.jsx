import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function CheckoutPage() {
  const { checkout, user, cart } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: '', paymentMethod: 'Card' });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!cart.items.length) {
      return;
    }

    const order = await checkout(form);
    navigate(`/order-confirmation/${order.id}`, { state: { order } });
  };

  return (
    <section>
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={onSubmit}>
        <textarea
          placeholder="Shipping address"
          value={form.address}
          onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
          required
        />
        <select
          value={form.paymentMethod}
          onChange={(event) => setForm((prev) => ({ ...prev, paymentMethod: event.target.value }))}
        >
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
        <button type="submit">Confirm Order</button>
      </form>
    </section>
  );
}

export default CheckoutPage;
