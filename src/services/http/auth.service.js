import $axios from '@/axios';

const baseURL = '/auth';

const AuthService = {
  login(credentials) {
    const url = `${baseURL}/login`;
    return $axios.post(url, credentials);
  },
  register(newAccount) {
    const url = `${baseURL}/register`;
    return $axios.post(url, newAccount);
  },
};

export default AuthService;
