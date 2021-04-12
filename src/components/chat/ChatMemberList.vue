<template>
  <div>
    <Spinner v-if="loading" />
    <div
      v-if="!loading"
      class="mb-3 text-h4"
    >
      {{ $t(titleKey, { count: userChats.length }) }}
    </div>
    <v-sheet
      v-if="userChats.length > 0"
      outlined
      rounded
    >
      <v-list class="py-0">
        <template
          v-for="(chat, chatIndex) in userChats"
        >
          <v-list-item
            :key="chat.id"
            :to="`/chat/${chat.id}`"
            link
          >
            <v-list-item-content>
              <div
                v-for="(member, memberIndex) in chat.membersIds"
                :key="member"
                :class="{ 'mb-2': memberIndex !== chat.membersIds.length - 1 }"
                class="d-flex align-center"
              >
                <Avatar
                  :alt="`${member}'s avatar`"
                  :size="40"
                />
                {{ member }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="chatIndex !== userChats.length - 1"
            :key="chatIndex"
          />
        </template>
      </v-list>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/shared/Avatar';
import Spinner from '@/components/shared/Spinner';

export default {
  name: 'ChatMemberList',
  components: { Avatar, Spinner },
  computed: {
    ...mapGetters({
      user: 'user/user',
      chats: 'chat/chats',
      loading: 'chat/loading',
    }),
    userChats() {
      if (this.chats.length === 0) {
        return [];
      }
      const userChats = this.chats.filter(chat => chat.membersIds?.includes(this.user.name));
      const userChatsCopy = JSON.parse(JSON.stringify(userChats));
      // remove user from member lists so it's name is not displayed on the chat list
      userChatsCopy.forEach(chat => chat.membersIds = chat.membersIds.filter(memberId => memberId !== this.user.name));
      return userChatsCopy;
    },
    titleKey: (vm) => vm.userChats.length > 0 ? 'chat.list.your-chats' : 'chat.list.no-chats',
  },
};
</script>

<style lang="scss" scoped>
</style>
