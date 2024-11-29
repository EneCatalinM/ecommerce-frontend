import axiosClient from '../api/axiosClient';

export const placeOrder = async (orderData: any, accessToken: string) => {
  console.log(orderData, accessToken)
  const response = await axiosClient.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getAllOrders = async () => {
    try {
      const response = await axiosClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
};

export const getUserOrders = async () => {
    try {
      const response = await axiosClient.get('/orders/my');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  };
  
  export const cancelOrder = async (orderId: string) => {
    try {
      const response = await axiosClient.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  };