import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles/MenuManager.css';
import MenuItemModal from './MenuItemModal';
import PrintModal from './PrintModal';

const MenuManager = ({products, storeInfo}) => {
  const [menuItems, setMenuItems] = useState(products);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  return (
    <div className="menu-manager-wrapper">
      <div className="menu-manager-header">
        <div className="menu-manager-actions">
          <button className="menu-btn-primary" onClick={() => { setModalOpen(true); setEditItem(null); }}>
            <i className="fa fa-plus" /> Add Item
          </button>
          <button className="menu-btn-secondary" onClick={() => setShowPrint(true)}>
            <i className="fa fa-print" /> Print
          </button>
        </div>
      </div>

      <div className="menu-manager-grid">
        {menuItems.map(item => (
          <motion.div
            key={item.id}
            className="menu-card"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={item.img} alt={item.name} className="menu-card-img" />
            <h3 className="menu-card-name">{item.name}</h3>
            {/* <p className="menu-card-desc">{item.description}</p> */}
            <div className="menu-card-footer">
              <span className="menu-card-price">R{item.price}</span>
              <div className="menu-card-controls">
            
                <button className="menu-btn-small" onClick={() => { setEditItem(item); setModalOpen(true); }}>
                  <i className="fa fa-pen" />
                </button>
                <button className="menu-btn-small menu-btn-danger" onClick={() => handleDelete(item.id)}>
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <MenuItemModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={(item) => {
                setMenuItems(prev => {
                const exists = prev.find(i => i.id === item.id);
                if (exists) {
                    return prev.map(i => (i.id === item.id ? item : i));
                } else {
                    return [...prev, { ...item, id: Date.now() }];
                }
                });
            }}
            existingItem={editItem}
            />

            <PrintModal
                isOpen={showPrint}
                onClose={() => setShowPrint(false)}
                storeInfo={storeInfo}
                menuItems={menuItems}
                />

    </div>
  );
};

export default MenuManager;
