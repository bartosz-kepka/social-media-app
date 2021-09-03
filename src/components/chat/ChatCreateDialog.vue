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
          dark
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
      <v-card-subtitle class="text-body-1 mt-3">
        {{ $t('chat.create.subtitle') }}
      </v-card-subtitle>
      <v-card-text>
        <v-form
          class="d-flex"
          @submit.prevent="addMember"
        >
          <v-text-field
            v-model.trim="newMemberId"
            :dense="$vuetify.breakpoint.mdAndDown"
            :error-messages="newMemberIdErrors"
            :label="$t('chat.create.member-name')"
            outlined
            required
          />
          <v-btn
            :small="$vuetify.breakpoint.mdAndDown"
            class="ml-3"
            color="primary"
            elevation="2"
            fab
            @click="addMember"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-form>
        <v-list class="py-0">
          <v-list-item
            v-for="(member, index) in membersIds"
            :key="member"
            :class="{ 'mb-2': $vuetify.breakpoint.lgAndUp & index < membersIds.length - 1}"
          >
            <Avatar
              :alt="`${member}'s avatar`"
              :size="$vuetify.breakpoint.mdAndDown ? 40 : 56"
            />
            <v-list-item-content>
              <div
                :key="member"
              >
                {{ member }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
import { required } from 'vuelidate/lib/validators';
import { isEqual } from 'underscore';
import Avatar from '@/components/shared/Avatar';

export default {
  name: 'ChatCreateDialog',
  components: { Avatar },
  data() {
    return {
      newMemberId: '',
      membersIds: [],
      dialog: false,
      chatExistsSnackbarShown: false,
    };
  },
  computed: {
    ...mapGetters({
      userId: 'user/userId',
      chats: 'chat/chats',
    }),
    newMemberIdErrors() {
      const errors = [];
      if (!this.$v.newMemberId.$dirty) {
        return errors;
      }
      if (!this.$v.newMemberId.required) {
        errors.push(this.$t('chat.create.error-message-required'));
      }
      if (!this.$v.newMemberId.notCurrentUser) {
        errors.push(this.$t('chat.create.error-message-not-current-user'));
      }
      if (!this.$v.newMemberId.notAlreadyAdded) {
        errors.push(this.$t('chat.create.error-message-not-already-added'));
      }
      return errors;
    },
    chatsWithSortedMembersIds() {
      if (this.chats.length === 0) {
        return [];
      }
      const chatsCopy = JSON.parse(JSON.stringify(this.chats));
      chatsCopy.forEach(chat => chat.membersIds.sort());
      return chatsCopy;
    },
  },
  methods: {
    addMember() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.membersIds.push(this.newMemberId);
      this.newMemberId = '';
      this.$v.$reset();
    },
    cancel() {
      this.dialog = false;
      this.newMemberId = '';
      this.membersIds = [];
      this.$v.$reset();
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
  validations: {
    newMemberId: {
      required,
      notCurrentUser: (value, vm) => value !== vm.userId,
      notAlreadyAdded: (value, vm) => vm.membersIds.every(member => member.toLowerCase() !== value.toLowerCase()),
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
</style>
