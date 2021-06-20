<template>
  <v-form
    @submit.prevent="handleRegister"
  >
    <div class="text-h4 mb-3">
      {{ $t('register.registerTitle') }}
    </div>
    <v-row>
      <v-col
        cols="12"
        lg="4"
        md="6"
        sm="9"
        xl="3"
      >
        <v-text-field
          v-model.trim="user.username"
          :error-messages="nameErrors"
          :label="$t('login.name')"
          outlined
          required
          @blur="$v.user.username.$touch()"
          @input="$v.user.username.$touch()"
        />
        <v-text-field
          v-model.trim="user.email"
          :error-messages="emailErrors"
          :label="$t('login.email')"
          outlined
          required
          @blur="$v.user.username.$touch()"
          @input="$v.user.username.$touch()"
        />
        <v-text-field
          v-model.trim="user.password"
          :error-messages="passwordErrors"
          :label="$t('login.password')"
          outlined
          required
          type="password"
          @blur="$v.user.password.$touch()"
          @input="$v.user.password.$touch()"
        />
      </v-col>
      <v-col
        cols="12"
        lg="1"
        md="3"
        sm="3"
      >
        <v-btn
          color="primary"
          type="submit"
        >
          {{ $t('login.register') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-form
      @submit.prevent="moveToLogin"
    >
      <v-btn
        color="primary"
        type="submit"
      >
        {{ $t('register.back-to-login') }}
      </v-btn>
    </v-form>
  </v-form>
</template>

<script>
import {minLength, required} from 'vuelidate/lib/validators';
import User from '../store/user';
import {mapGetters} from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      user: new User('', ''),
      submitted: false,
      successful: false,
      message: '',
    };
  },
  computed: {

    ...mapGetters({
      loggedIn: 'auth/login',
    }),

    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.minLength) {
        errors.push(this.$t('login.error-name-min-length'));
      }
      if (!this.$v.name.required) {
        errors.push(this.$t('login.error-name-required'));
      }
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.minLength) {
        errors.push(this.$t('login.error-email'));
      }
      if (!this.$v.name.required) {
        errors.push(this.$t('login.error-email'));
      }
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.minLength) {
        errors.push(this.$t('login.error-password-min-length'));
      }
      if (!this.$v.name.required) {
        errors.push(this.$t('login.error-password-required'));
      }
      return errors;
    },
  },
  methods: {

    moveToLogin() {
      this.$router.push('/login');
    },

    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
                alert('Succes');
                this.$router.push({name: 'Login'});
              },
              error => {
                alert(error.response.data.message);

                this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          );
        }
      });
    },

    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const user = {
        name: this.name,
      };
      this.$store.dispatch('user/setUser', user);
      this.$router.push({name: 'Home'});
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
  },
};
</script>

<style scoped>

</style>
