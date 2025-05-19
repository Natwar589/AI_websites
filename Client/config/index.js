import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
