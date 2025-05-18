import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { User, UserFormData } from "../types/user";

const API_URL = "http://localhost:8000/api/user";

export const userApi = {
  createUser: async (userData: UserFormData) => {
    const response = await axios.post(`${API_URL}/create`, userData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/getAllUsers`);
    return response.data;
  },

  updateUser: async (id: string, userData: UserFormData) => {
    const response = await axios.put(`${API_URL}/update/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  },
};
