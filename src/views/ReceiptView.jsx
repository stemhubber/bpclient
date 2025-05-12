import React from 'react';
import './styles/ReceiptView.css';
import { Link, useNavigate } from 'react-router-dom';

const ReceiptView = ({ orders, store, user, setSuccessOrder }) => {
  
  const orderId = orders[0]?.id;
  const timestamp = new Date().toLocaleString();
  const total = orders?.reduce((sum, p) => sum + p?.product?.price, 0);
  const navigate = useNavigate();

  if (!orders || orders.length === 0) return <p>No order found.</p>;

  const print = () =>{
    if (window.location.href.includes("print")){
      window.print();
    }else{
      navigate('/print');
      setSuccessOrder(false);
    }
    
  }
  return (
    <div className="receipt-paper">
      <h2 className="receipt-title">{store?.name}</h2>
      <p>Contact: {store?.contacts}</p>
      <h2 className="receipt-subtext">Order <strong>#{orderId}</strong></h2>
      <p className="receipt-subtext">Date: {timestamp}</p>
      <p><strong>{user.name}</strong> {user?.phone}</p>

      <hr />

      {orders.map((order, index) => (
        <div key={index} className="receipt-line">
          <span>{order?.product.name}</span>
          <span>R{order?.product.price}</span>
        </div>
      ))}

      <hr />

      <div className="receipt-total">
        <strong>Total</strong>
        <strong>R{total}</strong>
      </div>

      <p className="receipt-footer">Thank you for your order{user?` ${user.name}`:''}!</p>
      <p className="receipt-footer">JENETE APPS ©</p>
      <Link to='/print' className='no-print receipt-actions' onClick={(e)=>{
        e.preventDefault();
        print();
      }}> Print</Link>    
      <Link to='/orders' className='no-print'>Track</Link>
    </div>
  );
};

export default ReceiptView;
