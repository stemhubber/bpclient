import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from "./logo/logo.png";
import './styles/WelcomePage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const WelcomePage = () => {
  return (
    <motion.div initial="hidden" animate="visible" className="bp-container">
      {/* Header */}
      <header className="bp-header">
        <div className="bp-header-inner">
          <div className="bp-logo-title">
            <img src={logo} alt="BitePilot Logo" className="bp-logo" />
            <h1 className="bp-title">BitePilot</h1>
          </div>
          <nav className="bp-nav">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="bp-hero"
        variants={fadeUp}
        custom={0}
      >
        <h2>Welcome to BitePilot 🍽️</h2>
        <p>Your restaurant’s smartest co-pilot — manage orders, menus, and kitchens with ease.</p>
        <Link to="/list" className="bp-button">Get Started</Link>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="bp-section"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 variants={fadeUp} custom={1}>What BitePilot Offers</motion.h3>
        <div className="bp-features">
          {[{
            icon: "📋",
            title: "Order Management",
            desc: "Track, receive, and fulfill orders quickly and reliably."
          }, {
            icon: "🍕",
            title: "Menu Builder",
            desc: "Create and edit menus easily with images and prices."
          }, {
            icon: "👨‍🍳",
            title: "Kitchen Workflow",
            desc: "Optimize the kitchen with task-based order views."
          }].map((feature, i) => (
            <motion.div key={i} className="bp-feature-card" variants={fadeUp} custom={i + 2}>
              <h4>{feature.icon} {feature.title}</h4>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="bp-section about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 variants={fadeUp} custom={1}>About BitePilot</motion.h3>
        <motion.p variants={fadeUp} custom={2}>
          BitePilot is built by a local developer who understand the restaurant hustle, Amahle Lukhaya Jenete. From small food stalls to established kitchens, we help streamline your operations and grow your brand — one smart order at a time.
        </motion.p>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        id="contact"
        className="bp-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 variants={fadeUp} custom={1}>Take Off With BitePilot</motion.h3>
        <motion.p variants={fadeUp} custom={2}>
          Start your free trial or contact us for a personalized onboarding experience.
        </motion.p>
        <motion.button variants={fadeUp} custom={3} className="bp-button white">Contact Us</motion.button>
        <motion.p>
          The developer: AL JENETE <br></br>
          0735534588
        </motion.p>
      </motion.section>

      {/* Footer */}
      <footer className="bp-footer">
        &copy; {new Date().getFullYear()} BitePilot • Built with ❤️
      </footer>
    </motion.div>
  );
};

export default WelcomePage;
