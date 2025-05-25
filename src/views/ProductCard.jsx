import React from "react";
import "./styles/ProductCard.css";

const ProductCard = ({ product, onSelect }) => {
  return (
    <div className={`product-card-container ${product?.isAvailable? '': 'not-available-card'}`}>
      <img
        src={product.img}
        alt={product.name}
        className="product-card-image"
      />
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-waiting">
        <i className="fas fa-clock"></i> {product.waitingTime}
      </p>
      <p className="product-card-price">
         {product.description}
      </p>
      <p className="product-card-price">
         R{product.price}
      </p>
      {onSelect && (
        <button
          className="product-card-order-button"
          onClick={() => onSelect(product)}
        >
          <i className="fas fa-plus"></i> Order
        </button>
      )}
    </div>
  );
};

export default ProductCard;
