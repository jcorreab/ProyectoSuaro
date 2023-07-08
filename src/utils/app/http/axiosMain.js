import axios from 'axios';

const axiosMain = axios.create({
  baseURL: 'http://127.0.0.1:8090/api',
});

axiosMain.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

axiosMain.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosMain;
