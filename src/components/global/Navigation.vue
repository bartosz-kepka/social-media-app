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
      <v-spacer/>
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
          <Avatar :alt="`${displayName}'s avatar`"/>
          <v-list-item-content>
            <v-list-item-title>{{ displayName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider/>
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
          <LanguageSelect/>
          <v-btn
              block
              color="error"
              @click="logOut"
              class="mt-3"
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
import LanguageSelect from '@/components/shared/LanguageSelect';

export default {
  name: 'Navigation',
  components: { LanguageSelect, Avatar },
  data() {
    return {
      drawer: undefined,
      links: [
        ['mdi-home', 'navigation.home', '/home'],
        ['mdi-forum', 'navigation.chat', '/chat'],
      ],
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      displayName: 'user/displayName',
    }),
    nightMode: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(isNightMode) {
        this.$store.dispatch('settings/setNightMode', isNightMode);
      },
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('user/logOut').then();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
