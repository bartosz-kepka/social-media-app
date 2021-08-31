export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

export default {
  namespaced: true,
  state: {
    notifications: [],
    nextNotificationId: 0,
  },
  mutations: {
    showNotification(state, { message, timeout, type }) {
      const id = state.nextNotificationId;
      state.nextNotificationId += 1;
      state.notifications.push({
        id,
        message,
        type: type ?? NOTIFICATION_TYPES.INFO,
      });
      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id !== id);
      }, timeout ?? 10000);
    },
    hideNotification(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    },
    hideAll(state) {
      state.notifications = [];
    },
  },
  actions: {
    showNotification({ commit }, payload) {
      commit('showNotification', payload);
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
