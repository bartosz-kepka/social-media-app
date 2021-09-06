import AuthService from '@/services/http/auth.service';
import i18n from '@/locales/i18n';
import { NOTIFICATION_TYPES } from '@/store/modules/notification';
import router from '@/router';
import UserService from '@/services/http/user.service';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    loading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    clearState(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    register({ commit }, newAccount) {
      commit('setLoading', true);
      return AuthService.register(newAccount)
        .then(() => {
          const message = i18n.t('notifications.account-created');
          this.dispatch('notification/showNotification', {
            message,
            type: NOTIFICATION_TYPES.SUCCESS,
          });
        })
        .finally(() => commit('setLoading', false));
    },
    update({ commit }, editedAccount) {
      commit('setLoading', true);
      return UserService.editUser(editedAccount)
          .then(() => {
            const message = i18n.t('notifications.editUser-success');
            this.dispatch('notification/showNotification', {
              message,
              type: NOTIFICATION_TYPES.SUCCESS,
            });
          }).finally(() => commit('setLoading', false));
    },
    logIn({ commit }, credentials) {
      commit('setLoading', true);
      return AuthService.login(credentials)
        .then(
          ({ data: { user, token } }) => {
            commit('setUser', user);
            commit('setToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
          })
        .finally(() => commit('setLoading', false));
    },
    logOut({ commit }) {
      commit('clearState');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push({ name: 'Login' }).then();
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
  },
  getters: {
    user: state => state.user,
    userId: state => state.user.id,
    displayName: ({ user }) => user.displayName ?? `${user.firstName} ${user.lastName}`,
    token: state => state.token,
    isAuthenticated: state => !!state.token,
    loading: state => state.loading,
  },
};
