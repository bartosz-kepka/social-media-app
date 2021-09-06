<template>
  <div>
    <ChatMessages />
    <ChatNewMessage />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatNewMessage from '@/components/chat/ChatNewMessage';

export default {
  name: 'ChatConversation',
  components: { ChatMessages, ChatNewMessage },
  computed: {
    ...mapGetters({
      chat: 'chat/chat',
    }),
  },
  beforeMount() {
    const chatId = this.$route.params.chatId;
    if (!this.chat || this.chat.id !== chatId) {
      this.$store.dispatch('chat/fetchChat', chatId);
    }
  },
  beforeDestroy() {
    this.$store.dispatch('chat/clearChat');
  },
};
</script>

<style lang="scss" scoped>
</style>
