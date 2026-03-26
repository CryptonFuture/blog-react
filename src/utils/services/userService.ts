import { instance } from "../axiosConfig";

export const getActiveUser = async (page: any, limit: any) => {
  try {
    const response = await instance.get('/getActiveUser', {params: {page, limit}});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getInActiveUser = async (page: any, limit: any) => {
  try {
    const response = await instance.get('/getInActiveUser', {params: {page, limit}});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};


export const getUser = async () => {
  try {
    const response = await instance.get('/getAllUser');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};