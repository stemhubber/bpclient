import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CartView = ({cartMessage,cart,handleRemoveFromCart,calculateTotal,handleAddMore,setShowCart}) => {

  const navigate = useNavigate();
  const { id } = useParams();


  const checkOut = ()=>{
    setShowCart(false);
    navigate(`/checkout/${id}`);
  }

  return (
    <div>
        <div className="cart-modal fade-in">
          <h2>Your Cart</h2>
          <p className="cart-message">{cartMessage}</p>
          <div className="cart-items">
            {cart.map((product, index) => (
              <div key={index} className="cart-item">
                <img src={product.img} alt={product.name} />
                <div>
                  <h4>{product.name}</h4>
                  <p>R{product.price}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id, index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: R{calculateTotal(cart)}</h3>
          </div>

          <div className="cart-actions">
            <button className="add-more-btn" onClick={handleAddMore}>
              <i className="fas fa-arrow-left-circle"></i> Back
            </button>
            <button className="confirm-pay-btn" onClick={checkOut}>
              <i className="fas fa-credit-card"></i> Confirm and Pay
            </button>
          </div>
        </div>
    </div>
  )
}

export default CartView