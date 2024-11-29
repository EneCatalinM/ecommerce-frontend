import React from 'react';
import styles from './OrdersTab.module.scss';

interface OrdersTabProps {
  orders: any[];
  onCancelOrder: (orderId: string) => void;
  isAdmin: boolean;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onCancelOrder, isAdmin }) => {
  return (
    <div className={styles['orders-section']}>
      <h2>{isAdmin ? 'All Orders' : 'Your Orders'}</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div className={styles['order-details']}>
              <p>Order ID: <span>{order._id}</span></p>
              <p className={styles.status}>Status: {order.status}</p>
              <p>Total: <span>${order.totalPrice.toFixed(2)}</span></p>
            </div>
            <div className={styles.actions}>
              <button onClick={() => onCancelOrder(order._id)}>Cancel Order</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersTab;
