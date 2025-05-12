import React from "react";
import "./styles/OrderView.css";

const OrderView = ({ selectedProduct, onConfirm, onCancel }) => {
  if (!selectedProduct) return null;

  return (
    <div className="order-view-overlay">
      <div className="order-view-modal">
        <h2 className="order-view-title">Confirm Your Order</h2>
        <img
          src={selectedProduct.img}
          alt={selectedProduct.name}
          className="order-view-image"
        />
        <h3 className="order-view-product-name">{selectedProduct.name}</h3>
        <p className="order-view-product-detail">
          <i className="fas fa-clock"></i> {selectedProduct.waitingTime}
        </p>
        <p className="order-view-product-detail">
          <i className="fas fa-money-bill-wave"></i> R{selectedProduct.price}
        </p>
        <div className="order-view-buttons">
          <button className="order-view-confirm-btn" onClick={onConfirm}>
            <i className="fas fa-credit-card"></i> Confirm and Pay
          </button>
          <button className="order-view-cancel-btn" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
