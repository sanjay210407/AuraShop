import { useLocation, useParams } from 'react-router-dom';

function OrderConfirmationPage() {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <section>
      <h2>Order Confirmed 🎉</h2>
      <p>Your order ID is <strong>{id}</strong>.</p>
      {order && <p>Total paid: <strong>${order.total.toFixed(2)}</strong></p>}
    </section>
  );
}

export default OrderConfirmationPage;
