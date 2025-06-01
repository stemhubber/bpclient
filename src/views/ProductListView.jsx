import React from "react";
import ProductCard from "./ProductCard";
import "./styles/ProductListView.css"; // only for grid layout

const ProductListView = ({ products, onSelect, productsExtra, orders, setShowCart }) => {
  return (
    <div className="product-list">
      {/* Button Menu */}
      <div className="menu">
        
        <a href="#pizza-menu" className="menu-button">Pizza</a>
        <a href="#meal-menu" className="menu-button">Meals</a>
        {orders?.length > 0 && <button className="menu-button" onClick={()=>setShowCart(true)}> {orders?.length} Pay <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></button>}
      </div>
      <hr></hr>
      <h2 id="pizza-menu">Pizza</h2>
    <div className="product-list-grid">
    {products?.map((product, index) => (
        <ProductCard key={index} product={product} onSelect={onSelect} />
      ))}
    </div>
      
      <h2 id="meal-menu">Extra Meals</h2>
      <div className="product-list-grid">
      {productsExtra?.map((product, index) => (
        <ProductCard key={index} product={product} onSelect={onSelect} />
      ))}
      </div>
    </div>
  );
};

export default ProductListView;
