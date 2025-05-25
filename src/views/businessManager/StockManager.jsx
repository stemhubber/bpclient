// StockManager.jsx
import React, { useState } from 'react';
import './styles/StockManager.css';
import { useStockManager } from '../../services/StockManagerController';

const StockManager = ({ products, orders }) => {
  const {
    stockList,
    addItem,
    updateQuantity,
    deleteItem,
    filter,
    setFilter,
    STOCK_STATUSES,
  } = useStockManager({ products, orders });

  const [modalData, setModalData] = useState(null);
  const [formState, setFormState] = useState({ name: '', quantity: 100 });

  const openAddModal = () => {
    setFormState({ name: '', quantity: 100 });
    setModalData({ mode: 'add' });
  };

  const openEditModal = (item) => {
    setFormState({ name: item.name, quantity: item.quantity });
    setModalData({ mode: 'edit' });
  };

  const handleSave = () => {
    if (modalData.mode === 'add') {
      addItem(formState.name, formState.quantity);
    } else if (modalData.mode === 'edit') {
      updateQuantity(formState.name, formState.quantity);
    }
    setModalData(null);
  };

  const handleDelete = () => {
    deleteItem(formState.name);
    setModalData(null);
  };

  return (
    <div className="stock-manager">
      <div className="header-row">
        <h2>📦 Stock Count</h2>
        <button className="add-btn" onClick={openAddModal}>➕ Add Item</button>
      </div>

      <div className="filter-row">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value={STOCK_STATUSES.INSTOCK}>In Stock</option>
          <option value={STOCK_STATUSES.LOW}>Running Low</option>
          <option value={STOCK_STATUSES.OUT}>Out of Stock</option>
        </select>
      </div>
      <p>Stock count: {stockList?.length}</p>

      <div className="stock-grid">
        {stockList.sort((a,b)=> a.name.localeCompare(b.name)).map((item) => (
          <div
            key={item.name}
            className={`stock-card status-${item.status.replace(/\s/g, '').toLowerCase()}`}
            onClick={() => openEditModal(item)}
          >
            <h4>{item.name}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Used: {item.used}</p>
            <small>{item.note}</small>
          </div>
        ))}
      </div>

      {modalData && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{modalData.mode === 'add' ? 'Add New Item' : 'Edit Item'}</h3>
            <input
              type="text"
              placeholder="Item name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              disabled={modalData.mode === 'edit'}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formState.quantity}
              onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={handleSave}>✅ Save</button>
              {modalData.mode === 'edit' && <button onClick={handleDelete}>🗑️ Delete</button>}
              <button onClick={() => setModalData(null)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManager;
