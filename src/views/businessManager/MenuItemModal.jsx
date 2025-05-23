import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/MenuItemModal.css';

const MenuItemModal = ({ isOpen, onClose, onSave, existingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    available: true,
  });

  useEffect(() => {
    if (existingItem) {
      setFormData(existingItem);
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        available: true,
      });
    }
  }, [existingItem]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) return alert("Name and Price required");
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="menu-modal-backdrop" onClick={onClose}>
      <motion.div
        className="menu-modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <h3 className="menu-modal-title">{existingItem ? 'Edit' : 'Add'} Menu Item</h3>
        <div className="menu-modal-form">
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Price
            <input name="price" value={formData.price} onChange={handleChange} type="number" />
          </label>

          <label>
            Description
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>

          <label>
            Image URL
            <input name="image" value={formData.image} onChange={handleChange} />
          </label>

          <label className="menu-checkbox">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>

          <div className="menu-modal-actions">
            <button className="menu-btn-secondary" onClick={onClose}>Cancel</button>
            <button className="menu-btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuItemModal;
