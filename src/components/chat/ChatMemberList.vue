<template>
  <div>
    <Spinner v-if="loading"/>
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
              <UserIdentity
                  v-for="(memberId, memberIndex) in chat.membersIds"
                  :key="memberId"
                  :class="{ 'mb-2': memberIndex !== chat.membersIds.length - 1 }"
                  :user-identity="userIdentities[memberId]"
              />
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
import Spinner from '@/components/shared/Spinner';
import UserIdentity from '@/components/shared/UserIdentity';

export default {
  name: 'ChatMemberList',
  components: { UserIdentity, Spinner },
  computed: {
    ...mapGetters({
      userId: 'user/userId',
      chats: 'chat/chats',
      loading: 'chat/loading',
      userIdentities: 'chat/userIdentities',
    }),
    userChats() {
      if (this.chats.length === 0) {
        return [];
      }
      // remove user from member lists so their name is not displayed on the chat list
      return this.chats.map(chat => {
        return {
          ...chat,
          membersIds: chat.membersIds.filter(memberId => memberId !== this.userId),
        };
      });
    },
    titleKey: (vm) => vm.userChats.length > 0 ? 'chat.list.your-chats' : 'chat.list.no-chats',
  },
};
</script>

<style lang="scss" scoped>
</style>
