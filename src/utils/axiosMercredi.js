import axios from 'axios';

const axiosMercredi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

axiosMercredi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosMercredi;
