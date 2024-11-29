import axiosClient from '../api/axiosClient';

export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axiosClient.post('/users/register', userData);

    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
