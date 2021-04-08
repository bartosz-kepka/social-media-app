import $axios from '@/axios';

export default {
  namespaced: true,
  state: {
    chats: [],
    chatsLoading: false,
    chat: undefined,
  },
  mutations: {
    setChatsLoading(state, loading) {
      state.chatsLoading = loading;
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    setChat(state, chat) {
      state.chat = chat;
    },
    addMessage(state, newMessage) {
      state.chat.messages.push(newMessage);
    },
  },
  actions: {
    fetchChats({ commit }) {
      commit('setChatsLoading', true);
      $axios.get('/chats').then(response => {
        commit('setChats', response.data);
        commit('setChatsLoading', false);
      });
    },
    fetchChat({ commit }, chatId) {
      commit('setChatsLoading', true);
      $axios.get(`/chats/${chatId}`).then(response => {
        commit('setChat', response.data);
        commit('setChatsLoading', false);
      });
    },
    sendMessage({ commit, rootState, state }, newMessageContent) {
      const newMessage = {
        senderId: rootState.user.user.name,
        content: newMessageContent,
      };

      const url = `/chats/${state.chat.id}/messages`;

      $axios.post(url, newMessage).then(response => {
        commit('addMessage', response.data);
      });
    },
  },
  getters: {
    chats: state => state.chats || [],
    chatsLoading: state => state.chatsLoading,
    chat: state => state.chat,
    chatMessages: state => state.chat?.messages || [],
  },
};
