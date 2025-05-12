import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles/StoreList.css";

export const StoreList = ({ stores }) => {
  return (
    <div className="store-browser">
      <motion.h2
        className="store-browser-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        🏬 Browse Stores
      </motion.h2>

      <div className="store-browser-actions">
        <Link to="/register-store" className="store-register-btn">
          + Register a Store
        </Link>
      </div>

      <div className="store-browser-grid">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            className="store-browser-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/store/${store.id}`}>
              <img
                src={store.logo || "https://placehold.co/100x100?text=Logo"}
                alt={`${store.name} logo`}
                className="store-browser-logo"
              />
              <p className="store-browser-name">{store.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
