<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ displayName }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <p>
      {{ currentUser }}
    </p>
    <p>
      {{ currentUser.id }}
    </p>
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
  </div>
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
