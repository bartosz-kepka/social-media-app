<template>
  <v-container class="container">
    <v-row class="mb-0">
      <v-col
        cols="12"
        sm="8"
      >
        <div class="text-h4">
          <header class="jumbotron">
            <h3>
              <strong>{{ displayName }}</strong> Profile
            </h3>
          </header>
        </div>
      </v-col>
    </v-row>
    <div class="d-flex align-center">
      <v-divider class="mr-3" />
    </div>

    <v-text-field
      v-model.trim="currentUser.lastName"
      :label="$t('general.last-name')"
      outlined
    />
    <p>
      {{ currentUser.firstName }}
    </p>
    <p>
      {{ currentUser.lastName }}
    </p>
    <v-btn
      @click="editUser"
    >
      Edit
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters({
      currentUser: 'user/user',
      displayName: 'user/displayName',
    }),
  },
  methods: {
    editUser() {
      this.currentUser.firstName = 'Jan';
      console.log(this.currentUser);
      const edited =  this.currentUser ;
      this.$store.dispatch('user/update', edited)
    }
  }
};
</script>

<style scoped lang="scss">
</style>
