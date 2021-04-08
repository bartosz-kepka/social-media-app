export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    setUser({ commit, state }, user) {
      commit('setUser', user);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser({ commit }) {
      commit('clearUser');
      localStorage.removeItem('user');
    },
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => !!state.user === true
  },
};
