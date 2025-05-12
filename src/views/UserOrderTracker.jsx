import React, { useEffect, useState } from "react";
import "./styles/UserOrderTracker.css";
import { convertIDToTime, formatAndValidateCellNumber } from "../utils/utils";

const statuses = ["Pending", "Preparing", "Ready", "Delivery", "Completed"];

const UserOrderTracker = ({ orders, applysearch }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("bitepilot_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);

      const filtered = orders
        .filter((order) => order.user?.uid === user.uid)
        .sort((a, b) => {
          const aTime = new Date(convertIDToTime(a.id,false)) || 0;
          const bTime = new Date(convertIDToTime(b.id,false)) || 0;
          
          return bTime - aTime; // latest first
        });

      if (!applysearch) setUserOrders(filtered);
    }
  }, [orders, applysearch]);

  const searchUserOrders = ()=>{
    const validator = formatAndValidateCellNumber(searchInput?.toString());
    if(validator.valid){
        const filtered = orders
        .filter((order) => order.user?.uid === validator.phone);
        if (filtered && filtered.length > 0){
            setSearchStatus('Found '+ filtered.length + " orders.");
            setUserOrders(filtered);
        }
        else {
            setSearchStatus("❌ No orders found for this user");
        }
    }else{ 
        setSearchStatus("❌ "+validator.error);
    }
  }

  return (
    <div className="user-order-tracker-container">
      <h2 className="user-order-tracker-title">
        {currentUser?.name ? `${currentUser.name}'s Orders` : "Your Orders"}
      </h2>

      {applysearch && <div>
        <input type="text" placeholder="Search user by number" onChange={(e)=>setSearchInput(e.target.value)}></input>
        <button onClick={searchUserOrders}><i className="fa fa-search"></i></button>
        <p>{searchStatus}</p>
      </div>}

      {userOrders.length === 0 ? (
        <p className="user-order-tracker-empty">No orders found.</p>
      ) : (
        userOrders.map((order, index) => (
          <div key={order.id || index} className="user-order-tracker-card">
            <h4 className="user-order-tracker-order-id">Order #{order.id}</h4>
            <p>{convertIDToTime(order.id)}</p>
            <div className="user-order-tracker-products">
              {order.products.map((product, index) => (
                <div key={index} className="user-order-tracker-product-line">
                  <p>🍽 {product.name}</p>
                </div>
              ))}
            </div>

            <div className="user-order-tracker-status-progress">
              {statuses.map((status, i) => {
                const isCompleted = statuses.indexOf(order.status) > i;
                const isActive = order.status === status;
                return (
                  <div
                    key={status}
                    className={`user-order-tracker-status-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                  >
                    <div className="user-order-tracker-circle">{isCompleted ? "✓" : i + 1}</div>
                    <span className="user-order-tracker-label">{status}</span>
                    {isActive && order.lastUpdated}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrderTracker;
