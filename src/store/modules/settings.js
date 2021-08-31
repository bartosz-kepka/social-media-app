import i18n from '@/locales/i18n';
import vuetify from '@/plugins/vuetify';

export default {
  namespaced: true,
  state: {
    nightMode: true,
    language: 'pl',
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setNightMode(state, nightMode) {
      state.nightMode = nightMode;
    },
  },
  actions: {
    setSettings({ dispatch }, { nightMode, language }) {
      dispatch('setLanguage', language);
      dispatch('setNightMode', nightMode);
    },
    setLanguage({ commit, state }, language) {
      i18n.locale = language;
      commit('setLanguage', language);
      localStorage.setItem('settings', JSON.stringify(state));
    },
    setNightMode({ commit, state }, nightMode) {
      vuetify.framework.theme.dark = nightMode;
      commit('setNightMode', nightMode);
      localStorage.setItem('settings', JSON.stringify(state));
    },
  },
  getters: {
    isNightMode: state => state.nightMode,
  },
};
