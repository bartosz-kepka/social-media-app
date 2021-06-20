<template>
  <div>
    <v-form
      @submit.prevent="handleLogin"
    >
      <div class="text-h4 mb-3">
        {{ $t('login.title') }}
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
            @blur="this.$v.user.username.$touch()"
            @input="this.$v.user.username.$touch()"
          />
          <v-text-field
            v-model.trim="user.password"
            :error-messages="passwordErrors"
            :label="this.$t('login.password')"
            type="password"
            outlined
            required
            @blur="this.$v.user.password.$touch()"
            @input="this.$v.user.password.$touch()"
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
            {{ $t('login.log-in') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-form
      @submit.prevent="register"
    >
      <v-btn
        color="primary"
        type="submit"
      >
        {{ $t('login.register') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {minLength, required} from 'vuelidate/lib/validators';
import User from '../store/user';
import {mapGetters} from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
    };
  },
  computed: {

    ...mapGetters({
      loggedIn: 'auth/login',
    }),

    nameErrors() {
      const errors = [];
      if (this.$v.user.$dirty) {
        return errors;
      }
      if (!this.$v.user.username.minLength) {
        errors.push(this.$t('login.error-name-min-length'));
      }
      if (!this.$v.user.username.required) {
        errors.push(this.$t('login.error-name-required'));
      }
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) {
        return errors;
      }
      if (!this.$v.user.password.minLength) {
        errors.push(this.$t('login.error-password-min-length'));
      }
      if (!this.$v.user.password.required) {
        errors.push(this.$t('login.error-password-required'));
      }
      return errors;
    },
  },
  methods: {

    handleLogin() {

      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }
        if (this.user.username && this.user.password) {

          this.$store.dispatch('auth/login', this.user).then(
              () => {

                const user = {
                  name: this.user.username,
                };
                this.$store.dispatch('user/setUser', user);
                this.$router.push({name: 'Home'});
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                alert(error.response.data.message);
              }
          );
        }
    },

    register() {
      this.$router.push({name: 'Register'});
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
    user: {
      username: {
        minLength: minLength(4),
        required
      },
      password: {
        minLength: minLength(4),
        required
      },
    },
  }
};
</script>

<style scoped lang="scss">
</style>
