// services/StatsController.js

class StatsController {
    static getTopProducts(orders, limit = 5) {
      const counts = {};
      orders.forEach(({ product }) => {
        if (product?.name) {
          counts[product.name] = (counts[product.name] || 0) + 1;
        }
      });
  
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
    }
  
    static getRevenueByProduct(orders, limit = 5) {
      const revenue = {};
      orders.forEach(({ product }) => {
        if (product?.name && product.price) {
          revenue[product.name] = (revenue[product.name] || 0) + product.price;
        }
      });
  
      return Object.entries(revenue)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, total]) => ({ name, total }));
    }
  
    static getStatusDistribution(orders) {
      const statusMap = {};
      orders.forEach(({ status }) => {
        statusMap[status] = (statusMap[status] || 0) + 1;
      });
  
      return Object.entries(statusMap).map(([status, count]) => ({ status, count }));
    }
  
    static getAveragePricePerProduct(orders) {
      const totals = {};
      const counts = {};
  
      orders.forEach(({ product }) => {
        if (product?.name && product.price) {
          totals[product.name] = (totals[product.name] || 0) + product.price;
          counts[product.name] = (counts[product.name] || 0) + 1;
        }
      });
  
      return Object.keys(totals).map(name => ({
        name,
        average: +(totals[name] / counts[name]).toFixed(2),
      }));
    }
  }
  
  export default StatsController;
  