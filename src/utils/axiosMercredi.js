import axios from 'axios';

const axiosMercredi = axios.create({
  baseURL: 'https://0520-181-198-213-18.sa.ngrok.io/api/',
});

axiosMercredi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosMercredi;
