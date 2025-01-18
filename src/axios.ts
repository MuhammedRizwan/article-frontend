import axios from 'axios';
import { store } from './Redux/store';
import { clearUser } from './Redux/user_reducer';
import { logout } from './service/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

async function refreshAccessToken() {
  try {
    const response = await axiosInstance.get('/refresh-token'); 
    return response.data; 
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
}


axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      console.log('Refreshing access token...')
      try {
        const newAccessToken = await refreshAccessToken(); 

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        store.dispatch(clearUser()); 
        const response=await logout();
        console.log(response);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
