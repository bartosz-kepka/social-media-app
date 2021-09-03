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
import Navigation from '@/components/global/Navigation';
import Notifications from '@/components/global/Notifications';

export default {
  name: 'App',
  components: { Navigation, Notifications },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      token: 'user/token',
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
        if (this.$socket.disconnected) {
          this.openSocket();
        }
        this.$store.dispatch('chat/fetchChats');
        return;
      }

      if (!this.isAuthenticated) {
        if (this.$socket.connected) {
          this.closeSocket();
        }
        this.$store.dispatch('chat/clearChats');
        this.$store.dispatch('notification/hideAll');
      }
    },
    openSocket() {
      this.$socket.client.io.opts.query = {
        token: this.token,
      };
      this.$socket.client.connect();
    },
    closeSocket() {
      this.$socket.client.disconnect();
      this.$socket.client.io.opts.query = {};
      console.log('Disconnected from socket.io server');
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
