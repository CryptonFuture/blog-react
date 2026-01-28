import { instance } from "../axiosConfig";

export const addTag = async (payload: any) => {
  try {
    const response = await instance.post('/addTag', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.error || error;
  }
};

export const getTag = async () => {
  try {
    const response = await instance.get('/getTag');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
