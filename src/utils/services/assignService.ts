import { instance } from "../axiosConfig";

export const assignRole = async (payload: any) => {
  try {
    const response = await instance.post('/assign', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const assignNewRole = async (payload: any) => {
  try {
    const response = await instance.post('/assignNewRole', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getAssignRole = async () => {
  try {
    const response = await instance.get('/getUserRoles');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};