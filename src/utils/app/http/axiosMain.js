import axios from 'axios';

const axiosMain = axios.create({
  baseURL: 'https://ea46-181-198-213-18.ngrok-free.app/api'
});

axiosMain.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosMain;
