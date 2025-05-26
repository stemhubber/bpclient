import { useEffect, useState } from "react";
import "./styles/AdminView.css";
import { convertIDToTime, playOrderSound } from "../utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { soundMap } from "../utils/Constants";
import { Link, useParams } from "react-router-dom";
import StoreStatusController from "./StoreStatusController";
// import VoiceOrderCommand from "./VoiceOrderCommand";


const AdminView = ({ orders, onStatusChange, stores, onChangeStoreDetails }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const [storeDetails, setStoreDetails] = useState(null);

  useEffect(()=>{
        const store = stores?.find((s) => s.id === parseInt(id));
        if (store) {
            setStoreDetails(store);
            onChangeStoreDetails(store);
        }
  },[id, stores]);

  const filtered = orders?.sort((a, b) => {
            const aTime = new Date(convertIDToTime(a.id,false)) || 0;
            const bTime = new Date(convertIDToTime(b.id,false)) || 0;
            
            return bTime - aTime; // latest first
          });

  // 🧠 Group orders by their ID
  const groupedOrders = filtered.reduce((groups, order) => {
    const id = order.id;
    const user = order.user;
    const timestamp = convertIDToTime(id)
    if (!groups[id]) {
      groups[id] = { ...order, id, products: [], status: order.status, user, timestamp};
    }
    groups[id].products.push(order.product);
    return groups;
  }, {});

  const statuses = ["Pending", "Preparing", "Ready", "Completed"];

  const handleStatusChangeRequest = (orderId, status) => {
    setSelectedOrder(orderId);
    setNewStatus(status);
    setShowConfirm(true);
  };

  const handleConfirmStatusChange = () => {
      playOrderSound(soundMap.button_click);
      onStatusChange(selectedOrder, newStatus);
      setSuccessMessage(`Order #${selectedOrder} updated to ${newStatus}.`);
      setSelectedOrder(null);
      setNewStatus("");
      setShowConfirm(false);
      setTimeout(()=>{
        handleCloseSuccess();
      }, 3000);
    
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
  };

  // 🧠 Group by STATUS -> Inside, group by ID
  const ordersByStatus = statuses.reduce((acc, status) => {
    acc[status] = Object.values(groupedOrders).filter(order => order.status === status);
    return acc;
  }, {});

  const calculateTotal = (cart) => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + (item?.price || 0), 0);
  };

  return (
    <div className="admin-panel">
      {/* <VoiceOrderCommand/> */}
      <h2 className="admin-title">
        <i className="fas fa-clipboard-list"></i> {storeDetails?.name} Orders
      </h2>
      <StoreStatusController store={storeDetails} isAdmin={true} setStoreDetails={onChangeStoreDetails} orders={orders}/>
      <Link to={`/manage/${storeDetails?.id || id}`}>Admin mode</Link>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        statuses.map(status => (
          ordersByStatus[status]?.length > 0 && (
            <div key={status} className="cart-group">
              <h3 className="cart-status-title">
                <i className="fas fa-tasks"></i> {status} Orders [{ordersByStatus[status]?.length}]
              </h3>
              <div className="cart-items-grid">
                {ordersByStatus[status].map((order, index) => (
                  <motion.div
                        key={order.id}
                        className="cart-item-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >

                    <div className={`cart-item-header ${order.id === selectedOrder? 'selected-admin-order':''}`}>
                      <h4>Order #{order.id}</h4>
                      <p>{`${order?.user?.name} - ${order?.user?.uid}`}</p>
                      <p>{`${order?.timestamp}`}</p>
                    </div>
                    <div className="cart-item-body">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-line">
                          <p>{index+1}. {product.name}</p>
                        </div>
                      ))}
                      <h4>Total: {calculateTotal(order.products)}</h4>
                    </div>
                    <div className="cart-item-actions">
                      <label htmlFor={`status-${order.id}`} className="cart-item-label">Change Status:</label>
                      <select
                        id={`status-${order.id}`}
                        value={order.status}
                        onChange={(e) => handleStatusChangeRequest(order.id, e.target.value)}
                        className="cart-item-select"
                      >
                        {statuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        ))
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <AnimatePresence>
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >

            <h3>Confirm Status Update</h3>
            <p>Are you sure you want to update <strong>Order #{selectedOrder}</strong> to <strong>{newStatus}</strong>?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirmStatusChange}>
                Yes
              </button>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
        </AnimatePresence>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="success-toast">
          <p>{successMessage}</p>
          <button onClick={handleCloseSuccess}><i className="fas fa-times"></i></button>
        </div>
      )}
    </div>
  );
};

export default AdminView;
