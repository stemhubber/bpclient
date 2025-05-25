// CheckoutPage.js
import React, { useState } from 'react';
import './styles/CheckoutPage.css';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../auth/AuthPages';

const CheckoutPage = ({ order, handleConfirmAndPay, user, setUser, calculateTotal, totalOrders }) => {
  const [paymentMethod, setPaymentMethod] = useState('instore');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    setStatus('Processing order...');

    try {
      const payload = {
        items: order,
        paymentMethod,
        note,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        user: {uid: user.uid, name: user.name},
        total: calculateTotal(order),
        orderNum: (totalOrders+1),
      };

      await handleConfirmAndPay(payload);
      setStatus('✅ Order placed successfully!');
      setTimeout(() => navigate('/print'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-heading">Review & Place Your Order</h2>
      <div className="checkout-box">
        <div className="checkout-section">
          <p><strong>{user?.name}</strong></p>
          <p><strong>{user?.phone}</strong> </p>
          <p><strong>Items:</strong> {order?.length || 0}</p>
          <p><strong>Total:</strong> R{calculateTotal(order)}</p>
          
        </div>

        <div className="checkout-receipt">
          {order?.map((product, index) => (
            <div key={index} className="checkout-item">
              <span>{product.name}</span>
              <span>R{product.price}</span>
            </div>
          ))}
        </div>

        <label className="checkout-label">
          Payment Method:
          <select
            className="checkout-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="instore">In-store</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online" disabled>Online Payment (Coming Soon)</option>
          </select>
        </label>

        <textarea
          className="checkout-note"
          placeholder="Add a note (e.g., no onions, ring when outside)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        {!user && <AuthPage onUserLoggedIn={setUser} dontNavigate={true}/>}
        {status && <p className="checkout-status">{status}</p>}

        <div className="checkout-actions">
          <button
            className="checkout-btn secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Back
          </button>
          <button
            className="checkout-btn primary"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
