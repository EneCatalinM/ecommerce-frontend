import axiosClient from '../api/axiosClient';

export const getAllProducts = async () => {
  const response = await axiosClient.get('/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data;
};


export const searchProducts = async (query: string) => {
  const response = await axiosClient.get(`/products/search?q=${query}`);
  return response.data;
};

export const createProduct = async (productData: any) => {
  try {
    const response = await axiosClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};