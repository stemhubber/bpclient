import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/MenuItemModal.css';
import { uploadImage } from '../../services/GalleryController';


const MenuItemModal = ({ isOpen, onClose, onSave, existingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    isAvailable: true,
    waitingTime: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState('');
  const user = (sessionStorage.getItem('bitepilot_user'))? JSON.parse(sessionStorage.getItem('bitepilot_user')): {uid:'shared'};

  useEffect(() => {
    if (existingItem) {
      setFormData(existingItem);
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        isAvailable: true,
        waitingTime: '',
      });
    }
  }, [existingItem]);


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) return alert("Name and Price required");
    setLoading('Loading...');
    const image = await handleUpload(file);
    
    onSave({...formData, image: image? image.url: formData.image});
    setLoading('')
    onClose();
  };

  if (!isOpen) return null;
  const blobToDataURL = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };


  const handleFiles = async (e) => {
    setLoading('Loading....');
    const file = e.target.files[0];
    if(!file) return;
    const blob = new Blob([file], { type: file.type });
    const dataUrl = await blobToDataURL(blob);
    setFile(file);
    if(dataUrl) setFormData((prev)=> ({...prev, image: dataUrl}));
    setLoading('');
  };

  const handleUpload = async (file) => {
    if (!file) return;
      console.log('Loading...')
    const image = await uploadImage(file, 'menu_products');
    console.log('Uploaded, updating...')
    return image;
  };

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
            Waiting time
            <input name="waitingTime" value={formData.waitingTime} onChange={handleChange} />
          </label>

          <label>
            Image URL
            <input
              type="file"
              accept="image/*"
              onChange={handleFiles}
            />
            <img src={formData.image} alt="img" className="business-image-preview" />
          </label>

          <label className="menu-checkbox">
            
            Available <small> (can customers buy this)</small> <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
          </label>
          <p>{loading}</p>
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
