<template>
  <v-form
    @submit.prevent="login"
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
          v-model.trim="name"
          :error-messages="nameErrors"
          :label="$t('login.name')"
          outlined
          required
          @blur="$v.name.$touch()"
          @input="$v.name.$touch()"
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
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      name: '',
    };
  },
  computed: {
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
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const user = {
        name: this.name,
      };
      this.$store.dispatch('user/setUser', user);
      this.$router.push({ name: 'Home' });
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

<style scoped lang="scss">
</style>
