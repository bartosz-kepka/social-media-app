<template>
  <v-container class="container pa-0 pt-3">
    <v-form
        @submit.prevent="login"
        class="form d-flex flex-column"
    >
      <v-row class="mb-0">
        <v-col cols="12" sm="8">
          <div class="text-h4">
            {{ $t('login.title') }}
          </div>
        </v-col>
        <v-col cols="6" sm="4">
          <LanguageSelect/>
        </v-col>
      </v-row>
      <v-text-field
          v-model.trim="credentials.email"
          :error-messages="emailErrors"
          :label="$t('general.email')"
          outlined
          required
          @blur="$v.credentials.email.$touch()"
          @input="$v.credentials.email.$touch()"
      />
      <v-text-field
          v-model.trim="credentials.password"
          :error-messages="passwordErrors"
          :label="this.$t('general.password')"
          type="password"
          outlined
          required
          @blur="$v.credentials.password.$touch()"
          @input="$v.credentials.password.$touch()"
      />
      <v-btn
          color="primary"
          type="submit"
      >
        {{ $t('login.log-in') }}
      </v-btn>
      <div class="d-flex align-center">
        <v-divider class="mr-3"></v-divider>
        {{ this.$t('general.or') }}
        <v-divider class="ml-3"></v-divider>
      </div>
      <v-btn
          color="primary"
          @click="goToRegister"
      >
        {{ $t('login.register') }}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import LanguageSelect from '@/components/shared/LanguageSelect';

export default {
  name: 'Login',
  components: { LanguageSelect },
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      loading: 'user/loading',
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.credentials.email.$dirty) {
        return errors;
      }
      if (!this.$v.credentials.email.required) {
        errors.push(this.$t('login.error-email-required'));
      }
      if (!this.$v.credentials.email.email) {
        errors.push(this.$t('login.error-email-format'));
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.credentials.password.$dirty) {
        return errors;
      }
      if (!this.$v.credentials.password.required) {
        errors.push(this.$t('login.error-password-required'));
      }
      return errors;
    },
  },
  methods: {
    goToRegister() {
      this.$router.push({ name: 'Register' });
    },
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.dispatch('user/logIn', this.credentials)
          .then(() => this.$router.push({ name: 'Home' }));
    },
  },
  validations: {
    credentials: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 560px;

  .form {
    gap: 12px;
  }
}
</style>
