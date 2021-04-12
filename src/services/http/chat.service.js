import $axios from '@/axios';

const baseURL = '/chats';

const ChatService = {
  fetchChats() {
    return $axios.get(baseURL);
  },
  fetchChat(chatId) {
    const url = `${baseURL}/${chatId}`;
    return $axios.get(url);
  },
  createChat(newChat) {
    return $axios.post(baseURL, newChat);
  },
  sendMessage(chatId, newMessage) {
    const url = `${baseURL}/${chatId}/messages`;
    return $axios.post(url, newMessage);
  },
}

export default ChatService;
