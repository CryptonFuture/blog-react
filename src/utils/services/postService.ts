import { instance } from "../axiosConfig";

export const addPost = async (payload: any) => {
  try {
    const response = await instance.post('/addPost', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getPublishedPost = async (page: any, limit: any) => {
  try {
    const response = await instance.get('/getPublishedPost', {params: {page, limit}});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
