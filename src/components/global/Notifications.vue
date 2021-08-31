<template>
  <div class="main-container px-3">
    <v-alert
        v-for="notification in notifications"
        :key="notification.id"
        border="left"
        class="notification"
        dense
        dismissible
        icon="mdi-message-alert"
        :type="notification.type"
        @input="closeNotification(notification.id)"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters({
      notifications: 'notification/notifications',
    }),
  },
  methods: {
    closeNotification(id) {
      this.$store.dispatch('notification/hideNotification', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  position: fixed;
  z-index: 5;
  top: 12px;
  right: 0;
  width: 480px;

  @include respond-to($xs) {
    width: 100%;
  }

  .notification {
    word-wrap: normal;
    overflow-wrap: anywhere;
  }
}
</style>
