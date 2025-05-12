import React from "react";
import StatsController from "../services/StatsController";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./styles/StatsDashboard.css";

const StatsDashboard = ({ orders }) => {
  const topProducts = StatsController.getTopProducts(orders);
  const revenue = StatsController.getRevenueByProduct(orders);
  const status = StatsController.getStatusDistribution(orders);
  const averages = StatsController.getAveragePricePerProduct(orders);

  return (
    <div className="stats-dashboard">
      <h2>📊 Business Stats</h2>

      <div className="chart-box">
        <h3>Top Products</h3>
        <Bar data={{
          labels: topProducts.map(p => p.name),
          datasets: [{
            label: "Times Ordered",
            data: topProducts.map(p => p.count),
            backgroundColor: "#4bc0c0"
          }]
        }} />
      </div>

      <div className="chart-box">
        <h3>Revenue by Product</h3>
        <Bar data={{
          labels: revenue.map(p => p.name),
          datasets: [{
            label: "Revenue (R)",
            data: revenue.map(p => p.total),
            backgroundColor: "#36a2eb"
          }]
        }} />
      </div>

      <div className="chart-box">
        <h3>Order Status</h3>
        <Pie data={{
          labels: status.map(s => s.status),
          datasets: [{
            label: "Orders",
            data: status.map(s => s.count),
            backgroundColor: ["#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"]
          }]
        }} />
      </div>

      <div className="average-table">
        <h3>Average Price Per Product</h3>
        <ul>
          {averages.map(p => (
            <li key={p.name}>{p.name}: <strong>R{p.average}</strong></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsDashboard;
