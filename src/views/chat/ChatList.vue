<template>
  <v-sheet
    outlined
    rounded
  >
    <v-list class="py-0">
      <template
        v-for="(chat, index) in userChats"
      >
        <v-list-item
          :key="chat.id"
          :to="`/chat/${chat.id}`"
          link
        >
          <v-list-item-content>
            <div
              v-for="member in chat.membersIds"
              :key="member"
            >
              {{ member }}
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="index !== userChats.length - 1"
          :key="index"
        />
      </template>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatList',
  computed: {
    ...mapGetters({
      user: 'user/user',
      chats: 'chat/chats',
      chatsLoading: 'chat/chatsLoading',
    }),
    userChats() {
      const userChats = this.chats.filter(chat => chat.membersIds?.includes(this.user.name));
      const userChatsCopy = JSON.parse(JSON.stringify(userChats));
      // remove user from member lists so it's name is not displayed on the chat list
      userChatsCopy.forEach(chat => chat.membersIds = chat.membersIds.filter(memberId => memberId !== this.user.name));
      return userChatsCopy;
    },
  },
  beforeMount() {
    this.$store.dispatch('chat/fetchChats');
  },
};
</script>

<style lang="scss" scoped>
</style>
