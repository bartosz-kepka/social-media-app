import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:8080/api',
});

$axios.interceptors.request.use((config) => {
  return config;
});

export default $axios;
