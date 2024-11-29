import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllOrders, getUserOrders, cancelOrder } from '../../services/orderService';
import { getAllUsers, createUser } from '../../services/userService';
import { getAllProducts, createProduct, deleteProduct } from '../../services/productService';
import styles from './UserDashboard.module.scss';
import { TabsNavigation } from '../../components/TabsNavigation';
import { OrdersTab } from '../../components/OrdersTab';
import { UsersTab } from '../../components/UsersTab';
import { ProductsTab } from '../../components/ProductsTab';

interface Order {
  _id: string;
  products: any[];
  totalPrice: number;
  status: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<{ 
    name: string; 
    description: string; 
    price: number; 
    images: string[]; 
    category: string; 
  }>({
    name: '', 
    description: '', 
    price: 0, 
    images: [], 
    category: ''
  });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllOrders();
      fetchAllUsers();
      fetchAllProducts();
    } else {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching all orders:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      if (user?.role === 'admin') {
        fetchAllOrders();
      } else {
        fetchUserOrders();
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      fetchAllUsers();
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await createProduct(newProduct);
      fetchAllProducts();
      setNewProduct({ name: '', description: '', price: 0, images: [], category: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      fetchAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={user?.role === 'admin'} />

      <div className={styles.tabContent}>
        {activeTab === 'orders' && (
          <OrdersTab orders={orders} onCancelOrder={handleCancelOrder} isAdmin={user?.role === 'admin'} />
        )}
        {user?.role === 'admin' && activeTab === 'users' && (
          <UsersTab users={users} newUser={newUser} setNewUser={setNewUser} onCreateUser={handleCreateUser} />
        )}
        {user?.role === 'admin' && activeTab === 'products' && (
          <ProductsTab
            products={products}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            onCreateProduct={handleCreateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
