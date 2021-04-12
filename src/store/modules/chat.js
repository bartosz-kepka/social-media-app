import ChatService from '@/services/http/chat.service';
import i18n from '@/locales/i18n';

export default {
  namespaced: true,
  state: {
    loading: false,
    chats: [],
    chat: undefined,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    setChat(state, chat) {
      state.chat = chat;
    },
    clearChat(state) {
      state.chat = undefined;
    },
    clearChats(state) {
      state.chats = [];
    },
    addChat(state, newChat) {
      state.chats.push(newChat);
    },
    addMessage(state, newMessage) {
      state.chat.messages.push(newMessage);
    },
  },
  actions: {
    fetchChats({ commit }) {
      commit('setLoading', true);
      ChatService.fetchChats().then(response => {
        commit('setChats', response.data);
        commit('setLoading', false);
      });
    },
    fetchChat({ commit }, chatId) {
      commit('setLoading', true);
      ChatService.fetchChat(chatId).then(response => {
        commit('setChat', response.data);
        commit('setLoading', false);
      });
    },
    clearChat({ commit }) {
      commit('clearChat');
    },
    clearChats({ commit }) {
      commit('clearChats');
    },
    createChat({ commit }, membersIds) {
      const newChat = { membersIds };

      commit('setLoading', true);
      return ChatService.createChat(newChat).then(
        response => {
          commit('setChat', response.data);
          commit('setLoading', false);
          return response.data.id;
        },
        () => {
          commit('setLoading', false);
          return undefined;
        },
      );
    },
    sendMessage({ rootState, state }, newMessageContent) {
      const newMessage = {
        senderId: rootState.user.user.name,
        content: newMessageContent,
      };

      return ChatService.sendMessage(state.chat.id, newMessage).then();
    },
    // socket.io usage: https://www.npmjs.com/package/vue-socket.io-extended
    socket_newChat({ commit, rootState }, newChat) {
      if (newChat.membersIds.includes(rootState.user.user.name)) {
        commit('addChat', newChat);
      }
    },
    socket_newMessage({ commit, state, rootState }, newMessageDTO) {
      const { chatId, ...newMessage } = newMessageDTO;
      if (state.chat && state.chat.id === chatId) {
        commit('addMessage', newMessage);
        return;
      }
      const chat = state.chats.find(chat => chat.id === chatId);
      if (chat && chat.membersIds.includes(rootState.user.user.name)) {
        let notification;
        if (chat.membersIds.length === 2) {
          notification = i18n.t(
            'notifications.new-private-message',
            { sender: newMessage.senderId },
          );
        } else {
          notification = i18n.t(
            'notifications.new-group-message',
            { members: chat.membersIds.join(', ') },
          );
        }
        this.dispatch('notification/showNotification', notification);
      }
    },
  },
  getters: {
    loading: state => state.loading,
    chats: state => state.chats,
    chat: state => state.chat,
    chatMessages: state => state.chat?.messages || [],
  },
};
