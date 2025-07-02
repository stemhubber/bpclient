import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "./styles/ProductListView.css"; // only for grid layout
import { useParams } from "react-router-dom";
import ProductController from "../services/ProductsController";

const ProductListView = ({ products, onSelect, productsExtra, orders, setShowCart, setProducts, setProductsExtra }) => {

  const { id } = useParams();
  const productsController = new ProductController(id);
    useEffect(()=>{
        if (id) {
            console.log("Loading products for store ID:", id);
            setProducts(productsController.getAll(id));
            setProductsExtra(productsController.getExtraPackages(id));
        }
    },[id]);
  return (
    <div className="product-list">
      {/* Button Menu */}
      <div className="menu">
        
        <a href="#pizza-menu" className="menu-button">Main</a>
        <a href="#meal-menu" className="menu-button">Extra</a>
        {orders?.length > 0 && <button className="menu-button" onClick={()=>setShowCart(true)}> {orders?.length} Pay <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></button>}
      </div>
      <hr></hr>
      <h2 id="pizza-menu">Main</h2>
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
