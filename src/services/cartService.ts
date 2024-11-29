import axiosClient from '../api/axiosClient';

interface CartItem {
  productId: string;
  quantity: number;
}

export const getCart = async () => {
  try {
    const response = await axiosClient.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await axiosClient.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    const response = await axiosClient.delete(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
};


export const updateQuantity = async (productId: string, quantity: number) => {
  try {
    const response = await axiosClient.put(`/cart/${productId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating product quantity in cart:', error);
    throw error;
  }
};
