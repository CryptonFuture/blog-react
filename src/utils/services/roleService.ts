import { instance } from "../axiosConfig";

export const getRole = async () => {
  try {
    const response = await instance.get('/getRoles');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};