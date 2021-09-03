<template>
  <div>
    <ChatMemberList />
    <ChatCreateDialog />
  </div>
</template>

<script>
import ChatCreateDialog from '@/components/chat/ChatCreateDialog';
import ChatMemberList from '@/components/chat/ChatMemberList';

export default {
  name: 'ChatList',
  components: { ChatMemberList, ChatCreateDialog },
};
</script>

<style lang="scss" scoped>
</style>
