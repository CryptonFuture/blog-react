import { instance } from "../axiosConfig";

export const addPage = async (payload: any) => {
  try {
    const response = await instance.post('/addPages', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getPages = async (page: any, limit: any) => {
  try {
    const response = await instance.get('/getPages', {params: {page, limit}});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
