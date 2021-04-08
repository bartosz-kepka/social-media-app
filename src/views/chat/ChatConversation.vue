<template>
  <div>
    <ChatMessages />
    <v-form
      class="message-form"
      @submit.prevent="sendMessage"
    >
      <v-row>
        <v-col
          class="pr-0"
          cols="12"
          lg="3"
        >
          <v-btn
            v-if="$vuetify.breakpoint.lgAndUp"
            block
            class="mb-3"
            color="primary"
            @click="sendMessage"
          >
            {{ $t('chat.chat.send') }}
          </v-btn>
          <v-btn
            v-if="$vuetify.breakpoint.lgAndUp"
            block
            class="mb-3"
            color="secondary"
            @click="goToChatList"
          >
            {{ $t('chat.chat.back') }}
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          lg="9"
        >
          <div class="d-flex pb-3 pb-lg-0">
            <v-text-field
              v-model.trim="newMessageContent"
              :dense="$vuetify.breakpoint.mdAndDown"
              :error-messages="messageErrors"
              :hide-details="$vuetify.breakpoint.mdAndDown"
              :hint="$t('chat.chat.new-message-hint')"
              :label="$t('chat.chat.new-message')"
              outlined
              required
            />
            <v-btn
              v-if="$vuetify.breakpoint.mdAndDown"
              class="ml-3"
              color="primary"
              elevation="2"
              fab
              small
              @click="sendMessage"
            >
              <v-icon>
                mdi-send
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import ChatMessages from '@/components/chat/ChatMessages';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'ChatConversation',
  components: { ChatMessages },
  data() {
    return {
      newMessageContent: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/user'];
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.newMessageContent.$dirty) {
        return errors;
      }
      if (!this.$v.newMessageContent.required) {
        errors.push(this.$t('chat.chat.error-message-required'));
      }
      return errors;
    },
  },
  beforeMount() {
    const chatId = this.$route.params.chatId;
    this.$store.dispatch('chat/fetchChat', chatId);
  },
  methods: {
    goToChatList() {
      this.$router.push({ name: 'ChatList' });
    },
    sendMessage() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.dispatch('chat/sendMessage', this.newMessageContent);
      this.newMessageContent = '';
      this.$v.$reset();
    },
  },
  validations: {
    newMessageContent: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
.message-form {
  position: fixed;
  bottom: 0;

  @include respond-to($xs) {
    width: calc(100% - 0px - 24px);
  }

  @include respond-to($sm) {
    width: calc(100% - 0px - 24px);
  }

  @include respond-to($md) {
    width: calc(100% - 0px - 24px);
  }

  @include respond-to($lg) {
    width: calc(100% - 256px - 24px);
  }

  @include respond-to($xl) {
    width: calc(100% - 256px - 24px);
  }
}
</style>
