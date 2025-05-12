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

  static getTopCustomers(orders, limit = 3) {
    const customerMap = {};
    orders.forEach(({ user, product }) => {
      if (user?.uid && product?.price) {
        const name = user.name || user.uid;
        customerMap[name] = (customerMap[name] || 0) + product.price;
      }
    });

    return Object.entries(customerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, total]) => ({ name, total }));
  }

  static getSummaryText(orders) {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.product?.price || 0), 0);
    const avgWait =
      orders.reduce((sum, o) => {
        const min = parseInt(o.product?.waitingTime?.split(" ")[0]);
        return sum + (isNaN(min) ? 0 : min);
      }, 0) / (orders.length || 1);

    return [
      `🧾 Total Orders: ${totalOrders}`,
      // `💸 Total Revenue: R${totalRevenue.toFixed(2)}`,
      `⏱️ Average Waiting Time: ${Math.round(avgWait)} minutes`,
    ];
  }

  static getTopProductsSummary(orders, limit = 3) {
    return this.getTopProducts(orders, limit).map(
      ({ name, count }) => `🏆 “${name}” was ordered ${count} time(s).`
    );
  }

  static getRevenueSummary(orders, limit = 3) {
    return this.getRevenueByProduct(orders, limit).map(
      ({ name, total }) => `💰 “${name}” earned R${total.toFixed(2)} in total.`
    );
  }

  static getStatusSummary(orders) {
    return this.getStatusDistribution(orders).map(
      ({ status, count }) => `📦 ${count} order(s) are marked as "${status}".`
    );
  }

  static getCustomerSummary(orders, limit = 3) {
    return this.getTopCustomers(orders, limit).map(
      ({ name, total }) => `👤 ${name} spent R${total.toFixed(2)} in total.`
    );
  }
}

export default StatsController;
