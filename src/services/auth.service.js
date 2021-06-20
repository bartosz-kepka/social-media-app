import $axios from '@/axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(credentials) {
        return $axios
            .post(API_URL + 'signin', {
                username: credentials.username,
                password: credentials.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(credentials) {
        return $axios.post(API_URL + 'signup', {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
        });
    }
}

export default new AuthService();
