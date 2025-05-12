import React from 'react';
import { motion } from 'framer-motion';
import './styles/GallerySection.css'; // CSS below

const GallerySection = ({ gallery = [] }) => {
    return (
      <motion.div
        className="gallery-container"
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="gallery-scroll"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              className="gallery-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={item.image}
                alt={item.description}
                className="gallery-img"
              />
              <p className="gallery-desc">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };
  
  export default GallerySection;
