import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.quantity * parseFloat(item.cost.replace('$', ''))), 0).toFixed(2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        cart.map(item => (
          <div key={item.name} style={{ display: 'flex', gap: '15px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div>
              <h3>{item.name}</h3>
              <p>Unit Price: {item.cost}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
              <button onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })) : dispatch(removeItem(item.name))}>-</button>
              <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
            </div>
          </div>
        ))
      )}
      <button onClick={() => alert("Coming Soon")} style={{ marginRight: '10px' }}>Checkout</button>
      <button onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
}

export default CartItem;
