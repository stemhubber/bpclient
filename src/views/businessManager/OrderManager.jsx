// OrderManager.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/OrderManager.css';

const OrderManager = ({ store }) => {
  return (
    <div className="order-manager">
      <p className="section-title">Go to:</p>

      <Link to={`/admin/${store?.id}`} className="order-card">
        <div className="order-card-content">
          <strong>View Orders</strong>
          <span>Manage orders from your customers</span>
        </div>
        <i className="fa fa-arrow-right"></i>
      </Link>

      <Link to={`/menu/${store?.id}`} className="order-card">
        <div className="order-card-content">
          <strong>Customer Menu Page</strong>
          <span>Where your customers place orders</span>
        </div>
        <i className="fa fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default OrderManager;
