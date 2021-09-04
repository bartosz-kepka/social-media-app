<template>
  <div>
    <Spinner v-if="loading"/>
    <div
        v-if="!loading"
        class="mb-3 text-h4"
    >
      {{ $t(titleKey, { count: userChats.length }) }}
    </div>
    <UserGroupList
        :user-groups="userChats"
        :user-identities="userIdentities"
        :get-users-ids="(chat) => chat.membersIds"
        :get-redirect-link="(chat) => `/chat/${chat.id}`"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from '@/components/shared/Spinner';
import UserGroupList from '@/components/shared/UserGroupList/UserGroupList';

export default {
  name: 'ChatMemberList',
  components: { UserGroupList, Spinner },
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
