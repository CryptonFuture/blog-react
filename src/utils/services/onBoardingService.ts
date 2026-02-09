import { instance } from "../axiosConfig";

export const addOnBoardingUser = async (payload: any) => {
  try {
    const response = await instance.post('/create-with-permissions', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getOnBoardingUser = async () => {
  try {
    const response = await instance.get('/getOnBoardingUser');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};