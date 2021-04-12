<template>
  <div>
    <ChatMemberList />
    <ChatCreateDialog />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatCreateDialog from '@/components/chat/ChatCreateDialog';
import ChatMemberList from '@/components/chat/ChatMemberList';

export default {
  name: 'ChatList',
  components: { ChatMemberList, ChatCreateDialog },
  computed: {
    ...mapGetters({
      loading: 'chat/loading',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
