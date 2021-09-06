<template>
  <div
      class="d-flex align-center"
  >
    <div
        @click.stop.prevent="goToUserProfile"
        class="avatar-container"
    >
      <Avatar
          :alt="`${userIdentity && userIdentity.fullName}'s avatar`"
          :size="avatarSize"
      />
    </div>
    {{ userIdentity && userIdentity.fullName }}
  </div>
</template>

<script>
import Avatar from '@/components/shared/Avatar';
import router from '@/router';

export default {
  name: 'UserIdentity',
  components: { Avatar },
  props: {
    userIdentity: Object,
    avatarSize: {
      type: Number,
      default: 32,
    },
  },
  methods: {
    goToUserProfile() {
      router.push({ name: 'Profile', params: { userId: this.userIdentity.id } }).then();
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-container {
  cursor: pointer;
}
</style>