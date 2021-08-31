import axios from 'axios';
import store from '@/store/index';
import { NOTIFICATION_TYPES } from '@/store/modules/notification';

const $axios = axios.create({
  baseURL: 'http://localhost:8080/api',
});

$axios.interceptors.request.use(
  (request) => {
    const isAuthenticated = store.getters['user/isAuthenticated'];
    if (isAuthenticated) {
      const token = store.getters['user/token'];
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => error,
);

$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('user/logOut').then();
    } else {
      const message = error.response.data.message.toString();
      store.dispatch('notification/showNotification', {
        message,
        type: NOTIFICATION_TYPES.ERROR,
      }).then();
    }
    throw error;
  },
);

export default $axios;
