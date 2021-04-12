export default {
  namespaced: true,
  state: {
    notifications: [],
    nextNotificationId: 0,
  },
  mutations: {
    showNotification(state, message) {
      const id = state.nextNotificationId;
      state.nextNotificationId += 1;
      state.notifications.push({
        id,
        message,
      });
      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id !== id);
      }, 5000);
    },
    hideNotification(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    },
    hideAll(state) {
      state.notifications = [];
    },
  },
  actions: {
    showNotification({ commit }, message) {
      commit('showNotification', message);
    },
    hideNotification({ commit }, id) {
      commit('hideNotification', id);
    },
    hideAll({ commit }) {
      commit('hideAll');
    },
  },
  getters: {
    notifications: state => state.notifications,
  },
};
