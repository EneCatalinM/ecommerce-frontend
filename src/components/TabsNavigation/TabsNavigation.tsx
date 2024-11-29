import React from 'react';
import styles from './TabsNavigation.module.scss';

interface TabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ activeTab, setActiveTab, isAdmin }) => {
  return (
    <div className={styles.tabs}>
      {isAdmin && (
        <>
          <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? styles.active : ''}>
            All Orders
          </button>
          <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? styles.active : ''}>
            Users
          </button>
          <button onClick={() => setActiveTab('products')} className={activeTab === 'products' ? styles.active : ''}>
            Products
          </button>
        </>
      )}
      {!isAdmin && (
        <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? styles.active : ''}>
          Your Orders
        </button>
      )}
    </div>
  );
};

export default TabsNavigation;
