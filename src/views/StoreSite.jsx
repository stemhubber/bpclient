import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles/StoreSite.css";
import GallerySection from "./GallerySection";

const StoreSite = ({ stores }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = stores?.find((s) => s.id === parseInt(id));

  if (!store) return <p className="store-site-error">Store not found.</p>;

  const wallpaper = store.wallpaper || "https://placehold.co/1000x300?text=Store+Wallpaper";
  const logo = store.logo || "https://placehold.co/100x100?text=Logo";

  return (
    <motion.div
      className="store-site"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="store-site-hero" style={{ backgroundImage: `url(${wallpaper})` }}>
        <button className="store-site-back-btn" onClick={() => {navigate(-1)}}>
          ← Back
        </button>
        <motion.img
          src={logo}
          alt="Logo"
          className="store-site-logo"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        <motion.h1
          className="store-site-name"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {store.name}
        </motion.h1>
      </div>

      <div className="store-site-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {store.description && (
            <div className="store-site-about">
              <p>{store.description}</p>
            </div>
          )}
        <GallerySection gallery={store?.gallery || []}/>

        </motion.div>


        <motion.div
          className="store-site-visit-btn-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button className="store-site-visit-btn" onClick={() => {navigate(`/menu/${id}`);}}>
            Visit {store.name} <i className="fa fa-arrow-right"></i> 
          </button>
        </motion.div>

        {store?.owners?.length> 0 && <motion.div
            className="store-site-owners"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            >
            <h3>Meet the Owners</h3>
            <div className="owner-grid">
                {store?.owners?.map((owner, index) => (
                <div className="owner-card" key={index}>
                    <img
                    src={owner.img || "https://placehold.co/80x80?text=Owner"}
                    alt={owner.name}
                    className="owner-img"
                    />
                    <p className="owner-name">{owner.name}</p>
                </div>
                ))}
            </div>
            </motion.div>}

        <motion.div
          className="store-site-details"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p><i className="fa fa-map-marker-alt"></i> {store.location}</p>
          <p><i className="fa fa-phone"></i> {store.contacts}</p>
          <p><i className="fa fa-clock"></i> {store.openingTimes}</p>
        </motion.div>

        
        <motion.div
          className="store-site-visit-btn-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3>Map</h3>
        </motion.div>
        <motion.div
          className="store-site-map"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <iframe
            title="store-location"
            width="100%"
            height="250"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </motion.div>

        
      </div>
    </motion.div>
  );
};

export default StoreSite;
