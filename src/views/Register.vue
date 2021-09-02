<template>
  <v-container class="container pa-0 pt-3">
    <v-form
      class="form d-flex flex-column"
      @submit.prevent="register"
    >
      <v-row class="mb-0">
        <v-col
          cols="12"
          sm="8"
        >
          <div class="text-h4">
            {{ $t('register.title') }}
          </div>
        </v-col>
        <v-col
          cols="6"
          sm="4"
        >
          <LanguageSelect />
        </v-col>
      </v-row>
      <v-text-field
        v-model.trim="newAccount.email"
        :error-messages="emailErrors"
        :label="$t('general.email')"
        outlined
        required
        @blur="$v.newAccount.email.$touch()"
        @input="$v.newAccount.email.$touch()"
      />
      <v-text-field
        v-model.trim="newAccount.password"
        :error-messages="passwordErrors"
        :label="$t('general.password')"
        outlined
        required
        type="password"
        @blur="$v.newAccount.password.$touch()"
        @input="$v.newAccount.password.$touch()"
      />
      <v-text-field
        v-model.trim="newAccount.repeatPassword"
        :error-messages="repeatPasswordErrors"
        :label="$t('register.repeat-password')"
        outlined
        required
        type="password"
        @blur="$v.newAccount.repeatPassword.$touch()"
        @input="$v.newAccount.repeatPassword.$touch()"
      />
      <v-text-field
        v-model.trim="newAccount.firstName"
        :error-messages="firstNameErrors"
        :label="$t('general.first-name')"
        outlined
        required
        @blur="$v.newAccount.firstName.$touch()"
        @input="$v.newAccount.firstName.$touch()"
      />
      <v-text-field
        v-model.trim="newAccount.lastName"
        :error-messages="lastNameErrors"
        :label="$t('general.last-name')"
        outlined
        required
        @blur="$v.newAccount.lastName.$touch()"
        @input="$v.newAccount.lastName.$touch()"
      />
      <v-btn
        color="primary"
        type="submit"
        :loading="loading"
      >
        {{ $t('register.register') }}
      </v-btn>
      <div class="d-flex align-center">
        <v-divider class="mr-3" />
        {{ this.$t('general.or') }}
        <v-divider class="ml-3" />
      </div>
      <v-btn
        :disabled="loading"
        color="primary"
        @click="goToLogin"
      >
        {{ $t('register.login-to-existing-account') }}
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { email, minLength, required } from 'vuelidate/lib/validators';
import { containsLowercase, containsNumber, containsUppercase } from '@/utils/validators';
import LanguageSelect from '@/components/shared/LanguageSelect';

export default {
  name: 'Register',
  components: { LanguageSelect },
  data() {
    return {
      newAccount: {
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      loading: 'user/loading',
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.newAccount.email.$dirty) {
        return errors;
      }
      if (!this.$v.newAccount.email.required) {
        errors.push(this.$t('register.error-email-required'));
      }
      if (!this.$v.newAccount.email.email) {
        errors.push(this.$t('register.error-email-format'));
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.newAccount.password.$dirty) {
        return errors;
      }
      if (!this.$v.newAccount.password.required) {
        errors.push(this.$t('register.error-password-required'));
      }
      if (!this.$v.newAccount.password.minLength) {
        errors.push(this.$t('register.error-password-min-length'));
      }
      if (!this.$v.newAccount.password.containsUppercase) {
        errors.push(this.$t('register.error-password-uppercase'));
      }
      if (!this.$v.newAccount.password.containsLowercase) {
        errors.push(this.$t('register.error-password-lowercase'));
      }
      if (!this.$v.newAccount.password.containsNumber) {
        errors.push(this.$t('register.error-password-number'));
      }
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.newAccount.repeatPassword.$dirty) {
        return errors;
      }
      if (!this.$v.newAccount.repeatPassword.required) {
        errors.push(this.$t('register.error-repeat-password-required'));
      }
      if (!this.$v.newAccount.repeatPassword.match) {
        errors.push(this.$t('register.error-repeat-password-match'));
      }
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.newAccount.firstName.$dirty) {
        return errors;
      }
      if (!this.$v.newAccount.firstName.required) {
        errors.push(this.$t('register.error-first-name-required'));
      }
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.newAccount.lastName.$dirty) {
        return errors;
      }
      if (!this.$v.newAccount.lastName.required) {
        errors.push(this.$t('register.error-last-name-required'));
      }
      return errors;
    },
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const newAccountData = { ...this.newAccount };
      delete newAccountData.repeatPassword;
      this.$store.dispatch('user/register', newAccountData).then(
          () => this.$router.push({ name: 'Login' }),
      );
    },
  },
  validations: {
    newAccount: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        containsUppercase: containsUppercase,
        containsLowercase: containsLowercase,
        containsNumber: containsNumber,
      },
      repeatPassword: {
        required,
        match: function (value) {
          return value === this.newAccount.password;
        },
      },
      firstName: {
        required,
      },
      lastName: {
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
