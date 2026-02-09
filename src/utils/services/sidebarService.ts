import { instance } from "../axiosConfig";

export const getSidebars = async () => {
  try {
    const response = await instance.get('/getSideBar');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};