import React, { useState } from "react";
import "./styles/CustomerOrdersView.css";
import UserOrderTracker from "./UserOrderTracker";
import { speakText } from "../utils/utils";
import { Link, useParams } from "react-router-dom";

const CustomerOrdersView = ({ orders }) => {

  const [searchUser, setSearchUser] = useState(false);
  const { id } = useParams();
  // 🧠 Group orders by their ID
  const ordersById = orders.reduce((groups, order) => {
    const id = order.id;
    const userId = order.user;
    if (!groups[id]) {
      groups[id] = {...order, id, products: [], status: order.status, user: userId };
    }
    groups[id].products.push(order.product);
    return groups;
  }, {});
  const isUserAdmin = false; //TO DO check if user is admin
  // 🧠 Further group by status category
  const groupedOrders = {
    Payment: Object.values(ordersById).filter(order => order.status === "Pending"),
    Preparing: Object.values(ordersById).filter(order => order.status === "Preparing"),
    Collect: Object.values(ordersById).filter(order => order.status === "Ready"),
  };
  if (sessionStorage.getItem('bitepilot-admin')){
    let textToSpeech = 'Order number';
    groupedOrders.Collect.forEach((order)=>{
      const orderNum = order?.id?.split("-")[1];
      textToSpeech += ", "+orderNum;
    });
    
    speakText(textToSpeech);
  }


  

  const sections = [
    // { title: "Payment", icon: "fas fa-credit-card", key: "Payment" },
    { title: "Preparing", icon: "fas fa-concierge-bell", key: "Preparing" },
    { title: "Collect", icon: "fas fa-store", key: "Collect" }
  ];

  return (
    <div className="customer-orders-view">
      <h2 className="customer-orders-title">
        <i className="fas fa-receipt"></i> Orders
      </h2>
      <button onClick={()=> setSearchUser((prev)=> !prev)}><i className="fa fa-search"></i></button>
      <Link to={`/menu/${id}`} className="go-back-button">Go to menu</Link>
      {!isUserAdmin && orders && <UserOrderTracker orders={Object.values(ordersById)} applysearch={searchUser}/>}

      <div className="orders-grid">
        {sections.map(section => (
          <div key={section.key} className="orders-section">
            <h3 className="orders-section-title">
              <i className={section.icon}></i> {section.title}
            </h3>

            {groupedOrders[section.key].length === 0 ? (
              <p className="no-orders-text">No orders here.</p>
            ) : (
              <div className="orders-list">
                {groupedOrders[section.key].map(order => (
                  <div key={order.id} className="order-card">
                    <h4>Order #{order.id}</h4>
                    <h4>{order.user && `${order.user?.name} - ${order.user?.uid}`}</h4>
                    <div className="order-products-list">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-line">
                          {/* <p><i className="fas fa-utensils"></i> {product.name}</p>
                          <p><i className="fas fa-money-bill-wave"></i> R{product.price}</p> */}
                        </div>
                      ))}
                    </div>
                    {/* Optional: Total per order */}
                    {/* <div className="order-total">
                      Total: R{order.products.reduce((sum, product) => sum + (product.price || 0), 0)}
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrdersView;
