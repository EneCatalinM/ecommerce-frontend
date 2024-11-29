import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.scss';

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderPlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      return;
    }

    try {
      const orderData = {
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        shippingDetails: formData,
      };

      if (user && user.accessToken) {
        await placeOrder(orderData, user.accessToken);
        setOrderPlaced(true);
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        console.error('User is not logged in.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className={styles['checkout-container']}>
      <div className={styles['checkout-form']}>
        <h2>Checkout</h2>
        <form onSubmit={handleOrderPlacement}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your shipping address"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button type="submit" className={styles['checkout-button']}>
            Place Order
          </button>
          {orderPlaced && <p className={styles['order-success']}>Order successfully placed! Redirecting to dashboard...</p>}
        </form>
      </div>
      <div className={styles['checkout-cart']}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item._id} className={styles['cart-item']}>
                <img src={item.images[0]} alt={item.name} />
                <div className={styles['cart-info']}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles['total-price']}>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
