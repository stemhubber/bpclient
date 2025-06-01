import React from "react";
import { motion } from "framer-motion";
import StatsController from "../services/StatsController";
import "./styles/StatsDashboard.css";
import AdvStatsDashboard from "./AdvStatsDashboard";

const StatsDashboard = ({ orders, store }) => {
  const summaryText = StatsController.getSummaryText(orders);
  const topProducts = StatsController.getTopProductsSummary(orders);
  const status = StatsController.getStatusSummary(orders);
  const customers = StatsController.getCustomerSummary(orders);

  const entryAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const Section = ({ title, icon, items }) => (
    <motion.div className="info-card" variants={entryAnim} initial="hidden" animate="visible">
      <h3><i className={`fa ${icon}`}></i> {title}</h3>
      <ul>
        {items.map((line, i) => (
          <motion.li key={i} custom={i} variants={entryAnim}>
            {line}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <motion.div
      className="stats-dashboard"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <h2><i className="fa fa-line-chart"></i> Business Stats</h2>

      <AdvStatsDashboard store={store}/>

      <div className="summary-grid">
        <Section title="Quick Summary" icon="fa-info-circle" items={summaryText} />
        <Section title="Top Products" icon="fa-cutlery" items={topProducts} />
        <Section title="Top Customers" icon="fa-user" items={customers} />
        {/* <Section title="Revenue Highlights" icon="fa-money" items={revenue} /> */}
        <Section title="Order Status Breakdown" icon="fa-tasks" items={status} />
      </div>
    </motion.div>
  );
};

export default StatsDashboard;
