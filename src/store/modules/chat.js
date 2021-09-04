import ChatService from '@/services/http/chat.service';
import i18n from '@/locales/i18n';
import { normalizeUserIdentities } from '@/utils/identity';

function createNewChatNotificationMessage(newChat, currentUserId, userIdentities) {
  let notification;
  const otherMembers = newChat.membersIds.filter(
    memberId => memberId !== currentUserId && memberId !== newChat.creatorId,
  );
  if (otherMembers.length === 0) {
    notification = i18n.t(
      'notifications.new-private-chat',
      { creator: userIdentities[newChat.creatorId].fullName },
    );
  } else {
    const otherMembersFullNames = otherMembers.map((memberId) => userIdentities[memberId].fullName);
    notification = i18n.t(
      'notifications.new-group-chat',
      {
        creator: userIdentities[newChat.creatorId].fullName,
        otherMembers: otherMembersFullNames.join(', '),
      },
    );
  }
  return notification;
}

function createNewMessageNotificationMessage(chat, newMessage, currentUserId, userIdentities) {
  let notification;
  if (chat.membersIds.length === 2) {
    notification = i18n.t(
      'notifications.new-private-message',
      { sender: userIdentities[newMessage.senderId].fullName },
    );
  } else {
    const otherMembers = chat.membersIds.filter(
      memberId => memberId !== currentUserId && memberId !== newMessage.senderId,
    );
    const otherMembersFullNames = otherMembers.map((memberId) => userIdentities[memberId].fullName);
    notification = i18n.t(
      'notifications.new-group-message',
      {
        sender: userIdentities[newMessage.senderId].fullName,
        members: otherMembersFullNames.join(', '),
      },
    );
  }
  return notification;
}

export default {
  namespaced: true,
  state: {
    loading: false,
    userIdentities: {},
    chats: [],
    chat: null,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    addUserIdentities(state, userIdentities) {
      state.userIdentities = {
        ...state.userIdentities,
        ...normalizeUserIdentities(userIdentities),
      };
    },
    setChats(state, chats) {
      state.chats = chats;
    },
    setChat(state, chat) {
      state.chat = chat;
    },
    clearChat(state) {
      state.chat = null;
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
      return ChatService.fetchChats()
        .then(({ data: { payload: chats, userIdentities } }) => {
          commit('setChats', chats);
          commit('addUserIdentities', userIdentities);
        })
        .finally(() => commit('setLoading', false));
    },
    fetchChat({ commit }, chatId) {
      commit('setLoading', true);
      return ChatService.fetchChat(chatId)
        .then(({ data: { payload: chat, userIdentities } }) => {
          commit('setChat', chat);
          commit('addUserIdentities', userIdentities);
        })
        .finally(() => commit('setLoading', false));
    },
    clearChat({ commit }) {
      commit('clearChat');
    },
    clearChats({ commit }) {
      commit('clearChats');
    },
    createChat({ commit }, membersIds) {
      commit('setLoading', true);
      return ChatService.createChat({ membersIds })
        .then(({ data: { payload: chat, userIdentities } }) => {
          commit('setChat', chat);
          commit('addUserIdentities', userIdentities);
          return chat.id;
        })
        .finally(() => commit('setLoading', false));
    },
    sendMessage({ state }, newMessageContent) {
      return ChatService.sendMessage(state.chat.id, {
        content: newMessageContent,
      });
    },
    // socket.io usage: https://www.npmjs.com/package/vue-socket.io-extended
    socket_newChat({ commit, rootState, state }, { payload: newChat, userIdentities }) {
      commit('addChat', newChat);
      commit('addUserIdentities', userIdentities);
      const userId = rootState.user.user.id;
      if (newChat.creatorId !== userId) {
        const message = createNewChatNotificationMessage(newChat, userId, state.userIdentities);
        this.dispatch('notification/showNotification', { message });
      }
    },
    socket_newMessage({ commit, state, rootState }, newMessageDTO) {
      const userId = rootState.user.user.id;
      const { chatId, ...newMessage } = newMessageDTO;
      if (state.chat && state.chat.id === chatId) {
        commit('addMessage', newMessage);
        return;
      }
      const chat = state.chats.find(chat => chat.id === chatId);
      const message = createNewMessageNotificationMessage(chat, newMessage, userId, state.userIdentities);
      this.dispatch('notification/showNotification', { message });
    },
  },
  getters: {
    loading: state => state.loading,
    chats: state => state.chats,
    chat: state => state.chat,
    chatMessages: state => state.chat?.messages || [],
    userIdentities: state => state.userIdentities,
  },
};
