import { instance } from "../axiosConfig";

export const addPage = async (payload: any) => {
  try {
    const response = await instance.post('/addPages', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getPage = async () => {
  try {
    const response = await instance.get('/getPages');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
