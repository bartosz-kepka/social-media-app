<template>
  <v-form
    class="message-form pb-3"
    @submit.prevent="sendMessage"
  >
    <div class="d-flex">
      <v-text-field
        v-model.trim="newMessageContent"
        :dense="$vuetify.breakpoint.mdAndDown"
        :error-messages="messageErrors"
        :label="$t('chat.conversation.new-message')"
        hide-details
        outlined
        required
      />
      <v-btn
        :small="$vuetify.breakpoint.mdAndDown"
        class="ml-3"
        color="primary"
        elevation="2"
        fab
        @click="sendMessage"
      >
        <v-icon>
          mdi-send
        </v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'ChatNewMessage',
  data() {
    return {
      newMessageContent: '',
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    messageErrors() {
      const errors = [];
      if (!this.$v.newMessageContent.$dirty) {
        return errors;
      }
      if (!this.$v.newMessageContent.required) {
        errors.push(this.$t('chat.conversation.error-message-required'));
      }
      return errors;
    },
  },
  methods: {
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

  // width = whole page width - side navigation - page scroller
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
