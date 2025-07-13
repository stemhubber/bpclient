import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './styles/MenuManager.css';
import MenuItemModal from './MenuItemModal';
import PrintModal from './PrintModal';
import { ProductsService } from "../../services/ProductsService";
import { cleanSentence } from '../../utils/utils';

const MenuManager = ({ products, storeInfo }) => {
  const manual_products = products;
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [loading, setLoading] = useState(false);
  const testerMode = false;

  const storeId = storeInfo?.id;

  useEffect(() => {
    if (!storeId) return;
    setLoading(true);
    ProductsService.getProductsByStore(storeId)
      .then(data => {
        setMenuItems(data);
        setFilteredItems(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [storeId]);

  useEffect(() => {
    const lowerQuery = searchQuery?.toLowerCase().trim();
    if (lowerQuery === '' || lowerQuery === null){
      setFilteredItems(menuItems);
    }
    else setFilteredItems(
      menuItems.filter(item =>
        item.name.toLowerCase().includes(lowerQuery)
      )
    );
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      setLoading(true);
      try {
        await ProductsService.deleteProduct(id);
        const updated = menuItems.filter(item => item.id !== id);
        setMenuItems(updated);
        setFilteredItems(updated);
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const saveAll = async (newProducts) => {
    setLoading(true);
    try {
      const updatedProductsWithIds = newProducts.map((p, index) => ({
        ...p,
        id: cleanSentence(storeInfo.name) + index
      }));

      const updatedProducts = await ProductsService.saveAll(updatedProductsWithIds, storeId);

      console.log('Products uploaded successfully');
      setMenuItems(updatedProducts);
      setFilteredItems(updatedProducts);
      return updatedProducts;
    } catch (error) {
      console.error("Error saving products:", error);
      return newProducts;
    } finally {
      setLoading(false);
      console.log("Manual operation completed");
    }
  };
  const saveMenu = async (newProducts) => {
    setLoading(true);
    try {

      const updatedProducts = await ProductsService.saveAll(newProducts, storeId);

      console.log('Products uploaded successfully');
      setMenuItems(updatedProducts);
      setFilteredItems(updatedProducts);
      return updatedProducts;
    } catch (error) {
      console.error("Error saving products:", error);
      return newProducts;
    } finally {
      setLoading(false);
      console.log("Manual operation completed");
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
          {testerMode && (
            <button className="menu-btn-secondary" onClick={() => saveAll(manual_products)}>
              <i className="fa fa-save" /> SaveAll {storeId} - {manual_products?.length}
            </button>
          )}
          <input
            type="text"
            className="menu-search-input"
            placeholder={`Search in ${menuItems?.length} items...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="menu-manager-grid">
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            className="menu-card"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={item.image} alt={item.name} className="menu-card-img" />
            <h3 className="menu-card-name">{item.name}</h3>
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
        onSave={item => {
          setMenuItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            const updated = exists
              ? prev.map(i => (i.id === item.id ? item : i))
              : [...prev, {...item, id: cleanSentence(storeInfo.name)+"_"+prev.length}];
            saveMenu(updated);
            return updated;
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

      {loading && (
        <div className="loading-overlay">
          <i className="fa fa-spinner fa-spin"></i> Loading...
        </div>
      )}
    </div>
  );
};

export default MenuManager;
