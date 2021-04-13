import ChatService from '@/services/http/chat.service';
import i18n from '@/locales/i18n';

function createNewChatNotification(newChat, currentUserId) {
  let notification;
  const otherMembers = newChat.membersIds.filter(
    memberId => memberId !== currentUserId && memberId !== newChat.creatorId,
  );
  if (otherMembers.length === 0) {
    notification = i18n.t(
      'notifications.new-private-chat',
      { creator: newChat.creatorId },
    );
  } else {
    notification = i18n.t(
      'notifications.new-group-chat',
      {
        creator: newChat.creatorId,
        otherMembers: otherMembers.join(', '),
      },
    );
  }
  return notification;
}

function createNewMessageNotification(chat, newMessage, currentUserId) {
  let notification;
  if (chat.membersIds.length === 2) {
    notification = i18n.t(
      'notifications.new-private-message',
      { sender: newMessage.senderId },
    );
  } else {
    const otherMembers = chat.membersIds.filter(
      memberId => memberId !== currentUserId && memberId !== newMessage.senderId,
    );
    notification = i18n.t(
      'notifications.new-group-message',
      {
        sender: newMessage.senderId,
        members: otherMembers.join(', '),
      },
    );
  }
  return notification;
}

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
    createChat({ commit, rootState }, membersIds) {
      const newChat = {
        creatorId: rootState.user.user.name,
        membersIds,
      };
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
      const currentUserId = rootState.user.user.name;
      if (newChat.membersIds.includes(currentUserId)) {
        commit('addChat', newChat);
        if (newChat.creatorId !== currentUserId) {
          const notification = createNewChatNotification(newChat, currentUserId);
          this.dispatch('notification/showNotification', notification);
        }
      }
    },
    socket_newMessage({ commit, state, rootState }, newMessageDTO) {
      const currentUserId = rootState.user.user.name;
      const { chatId, ...newMessage } = newMessageDTO;
      if (state.chat && state.chat.id === chatId) {
        commit('addMessage', newMessage);
        return;
      }
      const chat = state.chats.find(chat => chat.id === chatId);
      if (chat && chat.membersIds.includes(currentUserId)) {
        const notification = createNewMessageNotification(chat, newMessage, currentUserId);
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
