// StoreOrderingUI.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BitePilotLogo from '../main/logo/BitePilotLogo'; // Make sure this exists
import ReceiptView from './ReceiptView';
import ProductListView from './ProductListView';
import CartView from './CartView';
import './styles/StoreOrderingUI.css';
import AuthPage from '../auth/AuthPages';

const StoreOrderingUI = ({
  loading,
  error,
  success_order,
  setSuccessOrder,
  receiptOrders,
  products,
  productsExtra,
  cart,
  showCart,
  setShowCart,
  cartMessage,
  handleRemoveFromCart,
  calculateTotal,
  handleAddMore,
  handleAddToCart,
  stores,
  onChangeStoreDetails,
  user,
  setUser
}) => {
    const { id } = useParams();
    const [storeDetails, setStoreDetails] = useState(null)
    useEffect(()=>{
        const store = stores?.find((s) => s.id === parseInt(id));
        if (store) {
            setStoreDetails(store);
            onChangeStoreDetails(store);
        }
    },[id, stores]);
  return (
    <div className="store-ordering-ui">
      <header className="store-header">
        <h1><BitePilotLogo /></h1>
        <h1>{storeDetails?.name}</h1>
        <p>{storeDetails?.contacts}</p>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <Link to={`/orders/${storeDetails?.id}`}>My Orders</Link>
        <Link to={`/admin/${storeDetails?.id}`}>Admin Panel</Link>
      </nav>
      {!user && <AuthPage onUserLoggedIn={setUser} dontNavigate={true}/>}

      {/* Loading Spinner */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Success Overlay */}
      {success_order && (
        <div className="success-order-overlay">
          <div className="success-order-modal">
            <img
              src="https://cdn.dribbble.com/userupload/25080196/file/original-48c228cd4a46a1426ed3f675271025b7.gif"
              alt="Order Success Animation"
              width="200"
              height="200"
              className="success-animation"
            />
            <ReceiptView
              orders={receiptOrders}
              user={user}
              store={storeDetails}
              setSuccessOrder={setSuccessOrder}
            />
            <button
              className="success-done-btn"
              onClick={() => setSuccessOrder(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {/* Product List */}
      <ProductListView
        products={products}
        productsExtra={productsExtra}
        orders={cart}
        setShowCart={setShowCart}
        onSelect={handleAddToCart}
      />

      {/* Cart */}
      {showCart && (
        <CartView
          cartMessage={cartMessage}
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          calculateTotal={calculateTotal}
          handleAddMore={handleAddMore}
          setShowCart={setShowCart}
        />
      )}
    </div>
  );
};

export default StoreOrderingUI;
