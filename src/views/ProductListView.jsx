import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./styles/ProductListView.css";
import { useParams } from "react-router-dom";
import { ProductsService } from "../services/ProductsService";

const ProductListView = ({ onSelect, orders, setShowCart }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredMain, setFilteredMain] = useState([]);
  const [filteredExtras, setFilteredExtras] = useState([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    let storeId = id
    try {
      storeId = parseInt(id);
    } catch (error) {
      console.error("id is not an int", error)
    }
    ProductsService.getProductsByStore(storeId)
      .then(data => {
        setAllProducts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const matched = allProducts.filter(p => p.name.toLowerCase().includes(q));

    setFilteredMain(matched.filter(p => !p.isExtra));
    setFilteredExtras(matched.filter(p => p.isExtra));
  }, [searchQuery, allProducts]);

  return (
    <div className="product-list">
      <div className="menu">
        <input
          type="text"
          className="menu-user-search-input"
          placeholder={`Search in ${allProducts?.length} meals...`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {orders?.length > 0 && (
          <button className="menu-button" onClick={() => setShowCart(true)}>
            {orders.length} Pay <i className="fa fa-arrow-circle-right" />
          </button>
        )}
      </div>

      <hr />
      <h2 id="main-menu">Menu</h2>
      <div className="product-list-grid">
        {filteredMain.map((product, index) => (
          <ProductCard key={index} product={product} onSelect={onSelect} />
        ))}
      </div>

      <h2 id="extra-menu">Extra Meals</h2>
      <div className="product-list-grid">
        {filteredExtras.map((product, index) => (
          <ProductCard key={index} product={product} onSelect={onSelect} />
        ))}
      </div>

      {loading && (
        <div className="loading-overlay">
          <i className="fa fa-spinner fa-spin"></i> Loading...
        </div>
      )}
    </div>
  );
};

export default ProductListView;
