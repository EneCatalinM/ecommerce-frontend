import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return <p className={styles['empty-cart']}>Your cart is empty.</p>;
  }

  return (
    <div className={styles['cart-container']}>
      <h1>Your Cart</h1>
      <ul className={styles['cart-list']}>
        {cart.map((item) => (
          <li key={item._id} className={styles['cart-item']}>
            <img src={item.images[0]} alt={item.name} className={styles['cart-item-image']} />
            <div className={styles['cart-info']}>
              <h3>{item.name}</h3>
              <p className={styles['price']}>${item.price.toFixed(2)}</p>
              <div className={styles['quantity-control']}>
                <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item._id}`}
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                />
              </div>
              <button className={styles['remove-button']} onClick={() => handleRemoveFromCart(item._id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles['cart-actions']}>
        <button onClick={handleCheckout} className={styles['checkout-button']}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
