import axiosClient from '../api/axiosClient';

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await axiosClient.post('/users/register', { name, email, password });
  return response.data;
};
