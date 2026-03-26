import { instance } from "../axiosConfig";

export const getLogs = async (page: any, limit: any) => {
  try {
    const response = await instance.get('/getLogs', {params: {page, limit}});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};