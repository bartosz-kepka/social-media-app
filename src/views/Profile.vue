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
};
</script>

<style scoped lang="scss">
</style>
