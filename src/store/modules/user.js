import i18n from '@/locales/i18n';
import vuetify from '@/plugins/vuetify';

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLanguage(state, language) {
      state.user = {
        ...state.user,
        language,
      };
    },
    setNightMode(state, nightMode) {
      state.user = {
        ...state.user,
        nightMode,
      };
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
  actions: {
    setUser({ commit }, user) {
      if (user.language) {
        i18n.locale = user.language;
      } else {
        user.language = i18n.locale;
      }
      if (user.nightMode !== undefined) {
        vuetify.framework.theme.dark = user.nightMode;
      } else {
        user.nightMode = vuetify.framework.theme.dark;
      }
      commit('setUser', user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    setLanguage({ commit, state }, language) {
      i18n.locale = language;
      commit('setLanguage', language);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setNightMode({ commit, state }, nightMode) {
      vuetify.framework.theme.dark = nightMode;
      commit('setNightMode', nightMode);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser({ commit }) {
      commit('clearUser');
      localStorage.removeItem('user');
    },
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => !!state.user,
  },
};
