// StockManagerController.js
import { useState, useEffect } from 'react';

export const STOCK_STATUSES = {
  INSTOCK: 'In Stock',
  LOW: 'Low Stock',
  OUT: 'Out of Stock',
};

// Utility
const extractIngredients = (description = '') =>
  description
    .split(',')
    .flatMap((item) =>
      item.includes(' and ')
        ? item.split(' and ')
        : item.includes('&')
        ? item.split('&')
        : [item]
    )
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean);

export const useStockManager = ({ products = [], orders = [] }) => {
  const [stockList, setStockList] = useState([]);
  const [filter, setFilter] = useState('All');

  // Rebuild stock list when products or orders change
  useEffect(() => {
    const stockMap = {};

    products.forEach((product) => {
      extractIngredients(product.description).forEach((ingredient) => {
        if (!stockMap[ingredient]) {
          stockMap[ingredient] = {
            name: ingredient,
            quantity: 100,
            used: 0,
            status: STOCK_STATUSES.INSTOCK,
            note: '',
          };
        }
      });
    });

    orders.forEach((order) => {
      if (!order.product) return;
      extractIngredients(order.product.description).forEach((ingredient) => {
        if (stockMap[ingredient]) stockMap[ingredient].used += 1;
      });
    });

    Object.values(stockMap).forEach((item) => {
      const remaining = item.quantity - item.used;
      if (remaining <= 0) {
        item.status = STOCK_STATUSES.OUT;
        item.note = 'Out of stock';
      } else if (remaining < 10) {
        item.status = STOCK_STATUSES.LOW;
        item.note = 'Running low';
      }
    });

    setStockList(Object.values(stockMap));
  }, [products, orders]);

  const addItem = (name, quantity = 100) => {
    const itemName = name.toLowerCase().trim();
    if (!itemName) return;
    setStockList((prev) => [
      ...prev,
      {
        name: itemName,
        quantity,
        used: 0,
        status: STOCK_STATUSES.INSTOCK,
        note: 'Manually added',
      },
    ]);
  };

  const updateQuantity = (name, quantity) => {
    setStockList((prev) =>
      prev.map((item) =>
        item.name === name ? updateStatus({ ...item, quantity: Number(quantity) }) : item
      )
    );
  };

  const updateStatus = (item)=>{
      const remaining = item.quantity - item.used;
      if (remaining <= 0) {
        item.status = STOCK_STATUSES.OUT;
        item.note = 'Out of stock';
      } else if (remaining < 10) {
        item.status = STOCK_STATUSES.LOW;
        item.note = 'Running low';
      }
      return item;
  }

  const deleteItem = (name) => {
    setStockList((prev) => prev.filter((item) => item.name !== name));
  };

  const filteredItems = stockList.filter((item) => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return {
    stockList: filteredItems,
    addItem,
    updateQuantity,
    deleteItem,
    filter,
    setFilter,
    STOCK_STATUSES,
  };
};
