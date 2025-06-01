// AdvStatsDashboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StatsController from '../services/StatsController';
import './styles/AdvStatsDashboard.css';

const AdvStatsDashboard = ({store}) => {
  const [stats, setStats] = useState({ visits: 0, orders: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store?.id) return;

    const unsubscribe = StatsController.listenToStats(store, (newStats) => {
      setStats(newStats);
      setLoading(false);
    });

    return () => unsubscribe?.();
  }, [store]);

  const StatCard = ({ label, value, icon }) => (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <i className={`fa ${icon} stat-icon`}></i>
      <h3 className="stat-value">{loading ? '...' : value}</h3>
      <p className="stat-label">{label}</p>
    </motion.div>
  );

  return (
    <section className="adv-stats-dashboard">
      <h2 className="stats-title">Real-Time Store Stats</h2>
      <div className="stats-grid">
        <StatCard label="User Visits" value={stats.visits} icon="fa-users" />
        <StatCard label="Orders Placed" value={stats.orders} icon="fa-shopping-cart" />
        <StatCard label="Orders Completed" value={stats.completed} icon="fa-check-circle" />
      </div>
    </section>
  );
};

export default AdvStatsDashboard;
