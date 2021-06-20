<template>
  <div>
    <v-app-bar
      app
      clipped-left
      elevate-on-scroll
      fixed
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndDown && isAuthenticated"
        @click="drawer = true"
      />
      <v-toolbar-title>{{ $t('navigation.app') }}</v-toolbar-title>
      <v-spacer />
      <v-switch
        v-model="nightMode"
        :hide-details="true"
        :label="$t('navigation.night-mode')"
        class="night-mode-switch"
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
          <Avatar :alt="`${user.name}'s avatar`" />
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
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
          <v-select
            v-model="language"
            :items="languages"
            :label="$t('navigation.language')"
            append-icon="mdi-translate"
            class="mb-3"
            dense
            hide-details
            outlined
          />
          <v-btn
            block
            color="error"
            @click="logOut"
          >
            {{ $t('navigation.log-out') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/shared/Avatar';

export default {
  name: 'Navigation',
  components: { Avatar },
  data() {
    return {
      drawer: undefined,
      languages: [
        {
          text: 'English',
          value: 'en',
        },
        {
          text: 'Polski',
          value: 'pl',
        },
      ],
      links: [
        ['mdi-home', 'navigation.home', '/home'],
        ['mdi-forum', 'navigation.chat', '/chat'],
      ],
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      user: 'user/user',
    }),
    language: {
      get() {
        return this.$i18n.locale;
      },
      set(val) {
        if (this.isAuthenticated) {
          this.$store.dispatch('user/setLanguage', val);
          return;
        }
        this.$i18n.locale = val;
      },
    },
    nightMode: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        if (this.isAuthenticated) {
          this.$store.dispatch('user/setNightMode', val);
          return;
        }
        this.$vuetify.theme.dark = val;
      },
    },
  },
  methods: {

    logOut() {
      this.drawer = false;
      this.$store.dispatch('user/clearUser');
      window.location.reload(true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
