<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
            v-bind="attrs"
            class="new-chat-button"
            color="primary"
            fab
            v-on="on"
        >
          <v-icon>mdi-message-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <v-card>
      <v-toolbar
          class="px-2"
          color="primary"
          dark
      >
        <div class="text-h5">
          {{ $t('chat.create.title') }}
        </div>
      </v-toolbar>
      <v-card-subtitle class="text-body-1 mt-3 pb-0">
        {{ $t('chat.create.subtitle') }}
      </v-card-subtitle>
      <v-card-text>
        <div v-if="!membersIds.length" class="search-users-text text-h6 primary--text">
          {{ $t('chat.create.search-users') }}
        </div>
        <UserGroupList
            class="my-3"
            v-if="membersIds.length"
            :user-groups="[membersIds]"
            :user-identities="membersIdentities"
            :get-group-id="() => 'membersIds'"
            :get-users-ids="(group) => group"
            icon="mdi-minus"
            :on-icon-click="removeMember"
            icon-color="error"
        />
        <v-form
            @submit.prevent="searchUsersIdentities"
        >
          <v-text-field
              v-model.trim="fullName"
              :dense="$vuetify.breakpoint.mdAndDown"
              :label="$t('chat.create.user')"
              outlined
              @blur="searchUsersIdentities"
              @input="searchUsersDebounced"
              prepend-inner-icon="mdi-account-search"
              hide-details
          />
        </v-form>
        <UserGroupList
            class="my-3"
            v-if="availableUsersIds.length"
            :user-groups="[availableUsersIds]"
            :user-identities="availableUserIdentities"
            :get-group-id="() => 'availableUserIds'"
            :get-users-ids="(group) => group"
            icon="mdi-plus"
            :on-icon-click="addMember"
        />
        <div v-if="noResults" class="text-h6 error--text">
          {{ $t('general.no-results') }}
        </div>
      </v-card-text>
      <v-card-actions class="justify-space-between py-3">
        <v-btn
            text
            @click="cancel"
        >
          {{ $t('general.cancel') }}
        </v-btn>
        <v-btn
            :disabled="membersIds.length === 0"
            color="primary"
            @click="create"
        >
          {{ $t('general.create') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
        v-model="chatExistsSnackbarShown"
        color="error"
    >
      {{ $t('chat.create.error-message-chat-exists') }}
      <template v-slot:action="{ attrs }">
        <v-btn
            v-bind="attrs"
            text
            @click="chatExistsSnackbarShown = false"
        >
          {{ $t('general.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce, isEqual } from 'underscore';
import UserGroupList from '@/components/shared/UserGroupList/UserGroupList';
import UserService from '@/services/http/user.service';
import { normalizeUserIdentities } from '@/utils/identity';

export default {
  name: 'ChatCreateDialog',
  components: { UserGroupList },
  data() {
    return {
      fullName: '',
      membersIdentities: {},
      dialog: false,
      chatExistsSnackbarShown: false,
      searchUsersDebounced: debounce(this.searchUsersIdentities, 250),
      foundUsersIdentities: [],
      noResults: false,
    };
  },
  computed: {
    ...mapGetters({
      userId: 'user/userId',
      chats: 'chat/chats',
    }),
    chatsWithSortedMembersIds() {
      if (this.chats.length === 0) {
        return [];
      }
      const chatsCopy = JSON.parse(JSON.stringify(this.chats));
      chatsCopy.forEach(chat => chat.membersIds.sort());
      return chatsCopy;
    },
    availableUserIdentities() {
      const availableUserIdentities = this.foundUsersIdentities
          .filter(({ id }) => !this.membersIds.includes(id) && this.userId !== id);
      return normalizeUserIdentities(availableUserIdentities);
    },
    membersIds() {
      return Object.keys(this.membersIdentities);
    },
    availableUsersIds() {
      return Object.keys(this.availableUserIdentities);
    },
  },
  methods: {
    searchUsersIdentities() {
      if (!this.fullName) {
        this.foundUsersIdentities = [];
        this.noResults = false;
        return;
      }
      UserService.searchUsersIdentitiesByFullName(this.fullName)
          .then(({ data: foundUserIdentities }) => {
            this.foundUsersIdentities = foundUserIdentities;
            this.noResults = !foundUserIdentities.length;
          });
    },
    addMember(memberToAddId) {
      this.membersIdentities = {
        ...this.membersIdentities,
        [memberToAddId]: this.availableUserIdentities[memberToAddId],
      };
    },
    removeMember(memberToRemoveId) {
      const { [memberToRemoveId]: memberToRemove, ...newMemberIdentities } = this.membersIdentities;
      memberToRemove; // to avoid no-unused-vars error
      this.membersIdentities = newMemberIdentities;
    },
    cancel() {
      this.dialog = false;
      this.fullName = '';
      this.membersIdentities = {};
      this.foundUsersIdentities = [];
    },
    create() {
      this.chatExistsSnackbarShown = false;
      const newChatMembersIds = [this.userId, ...this.membersIds].sort();
      if (this.chatsWithSortedMembersIds.some(chat => isEqual(chat.membersIds, newChatMembersIds))) {
        this.chatExistsSnackbarShown = true;
        return;
      }
      const vm = this;
      this.$store.dispatch('chat/createChat', this.membersIds)
          .then(chatId => chatId && vm.$router.push(`/chat/${chatId}`));
    },
  },
};
</script>

<style lang="scss" scoped>
.new-chat-button {
  position: fixed;
  bottom: 12px;
  right: 12px;
}

.search-users-text {
  margin-top: 12px;
  margin-bottom: 38px;
}
</style>
