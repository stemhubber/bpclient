import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles/BusinessProfileManager.css';

const BusinessProfileManager = ({storeInfo}) => {
  const [formData, setFormData] = useState(storeInfo);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (name, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert('Business profile updated!');
    // Optionally send to Firestore
  };

  return (
    <motion.div
      className="business-profile-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="business-profile-title">Profile</h2>
      <div className="business-profile-form">
        <label>
          Business Name
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Logo Image
          <input type="file" accept="image/*" onChange={(e) => handleImageChange('logo', e)} />
          <img src={formData.logo} alt="Logo" className="business-image-preview" />
        </label>

        <label>
          Wallpaper Image
          <input type="file" accept="image/*" onChange={(e) => handleImageChange('wallpaper', e)} />
          <img src={formData.wallpaper} alt="Wallpaper" className="business-wallpaper-preview" />
        </label>

        <label>
          Contact Number
          <input name="contact" value={formData.contact} onChange={handleChange} />
        </label>

        <label>
          Location
          <input name="location" value={formData.location} onChange={handleChange} />
        </label>

        <label>
          About / Description
          <textarea name="about" value={formData.about} onChange={handleChange} />
        </label>

        <button className="business-btn-primary" onClick={handleSave}>
          <i className="fa fa-save" /> Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default BusinessProfileManager;
