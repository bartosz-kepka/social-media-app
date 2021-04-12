<template>
  <v-app>
    <Navigation />
    <Notifications />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Navigation from '@/components/navigation/Navigation';
import Notifications from '@/components/global/Notifications';

export default {
  name: 'App',
  components: { Navigation, Notifications },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
    }),
  },
  watch: {
    isAuthenticated() {
      this.initState();
    },
  },
  created() {
    this.initState();
  },
  methods: {
    initState() {
      if (this.isAuthenticated) {
        this.$store.dispatch('chat/fetchChats');

        if (this.$socket.disconnected) {
          this.$socket.client.open();
        }
        return;
      }

      if (!this.isAuthenticated) {
        this.$store.dispatch('chat/clearChats');
        this.$store.dispatch('notification/hideAll');

        if (this.$socket.connected) {
          this.$socket.client.close();
          console.log('Disconnected from socket.io server');
        }
      }
    },
  },
  sockets: {
    connect() {
      console.log('Connected to socket.io server');
    },
  },
};
</script>

<style lang="scss">
</style>
