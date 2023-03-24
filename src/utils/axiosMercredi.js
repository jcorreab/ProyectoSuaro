import axios from 'axios';

const axiosMercredi = axios.create({
  baseURL: 'https://925e-2800-bf0-8331-130-1840-98d0-b64a-2e2b.ngrok.io/api/'
});

axiosMercredi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosMercredi;
