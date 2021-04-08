<template>
  <div>
    <v-app-bar
      app
      clipped-left
      elevate-on-scroll
      fixed
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndDown"
        @click="drawer = true"
      />
      <v-toolbar-title>{{ $t('navigation.app') }}</v-toolbar-title>
      <v-spacer />
      <v-switch
        v-model="nightMode"
        :hide-details="true"
        :label="$t('navigation.night-mode')"
        class="night-mode-switch"
        @change="changeColorMode"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
      app
      clipped
    >
      <v-list class="py-0">
        <v-list-item
          class="py-1"
          link
          to="/profile"
        >
          <v-avatar
            class="avatar mr-2"
            size="52"
          >
            <img
              alt="Your avatar"
              src="../assets/logo.png"
            >
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ fullName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list class="py-0">
        <v-list-item
          v-for="[icon, translationKey, to] in links"
          :key="to"
          :to="to"
          link
        >
          <v-list-item-icon>
            <v-icon x-large>
              {{ icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(translationKey) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-3">
          <v-btn
            block
            color="error"
            @click="logout"
          >
            {{ $t('navigation.logout') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      drawer: null,
      nightMode: true,
      links: [
        ['mdi-home', 'navigation.home', '/home'],
        ['mdi-forum', 'navigation.chat', '/chat'],
      ],
      state: {
        user: {
          firstName: 'John',
          lastName: 'Thiccccccccc',
        },
      },
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['user/isAuthenticated'];
    },
    fullName() {
      return `${this.state.user.firstName} ${this.state.user.lastName}`;
    },
  },
  beforeMount() {
    this.changeColorMode();
  },
  methods: {
    changeColorMode() {
      this.$vuetify.theme.dark = this.nightMode;
    },
    logout() {
      this.$store.dispatch('user/clearUser');
      this.drawer = false;
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  border: 2px solid white;
}
</style>
