<template>
  <v-app>
    <Navigation />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: { Navigation },
};
</script>

<style lang="scss">
</style>
