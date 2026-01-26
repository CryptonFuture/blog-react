import { instance } from "../axiosConfig";

export const addPost = async (payload: any) => {
  try {
    const response = await instance.post('/addPost', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getPost = async () => {
  try {
    const response = await instance.get('/getPublishedPost');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
