import { instance } from "../axiosConfig";

export const addTag = async (payload: any) => {
  try {
    const response = await instance.post('/addTag', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.error || error;
  }
};

export const getTags = async (page: any, limit: any) => {
  try {
    const response = await instance.get('/getTag', {params: {page, limit}});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
