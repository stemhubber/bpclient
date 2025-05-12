import React from "react";
import { motion } from "framer-motion";
import "./styles/AboutPage.css";

const features = [
  {
    icon: "fa-solid fa-store",
    title: "Digital Storefront",
    description: "Each vendor gets a sleek, personalized online store to showcase their brand.",
  },
  {
    icon: "fa-solid fa-utensils",
    title: "Menu Management",
    description: "Easily upload, edit, and manage menu items with prices and availability.",
  },
  {
    icon: "fa-solid fa-bell-concierge",
    title: "Order Handling",
    description: "Get notified when an order is placed. Track order statuses in real-time.",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Business Insights",
    description: "View analytics and track order trends to make better decisions.",
  },
];

const AboutPage = () => {
  const year = new Date().getFullYear();

  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        👋 About BitePilot
      </motion.h1>

      <motion.p
        className="about-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <strong>BitePilot</strong> is a modern food ordering and kitchen management platform built
        to empower local vendors. Whether you're running a restaurant, takeaway, or home kitchen,
        BitePilot helps you go digital with ease and style.
      </motion.p>

      <div className="about-features">
        {features.map((feature, i) => (
          <motion.div
            className="about-feature-card"
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
          >
            <i className={`about-feature-icon ${feature.icon}`} />
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="about-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <h3>👨‍💻 Developed by</h3>
        <p>Amahle Lukhaya Jenete – Software Engineer and Entrepreneur from Cape Town.</p>
      </motion.div>

      <motion.div
        className="about-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p>© {year} BitePilot. All rights reserved.</p>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
