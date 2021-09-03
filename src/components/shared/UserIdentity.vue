<template>
  <div
      class="d-flex align-center"
  >
    <Avatar
        :alt="`${userIdentity.fullName}'s avatar`"
        :size="avatarSize"
    />
    {{ userIdentity.fullName }}
  </div>
</template>

<script>
import Avatar from '@/components/shared/Avatar';

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
};
</script>

<style scoped lang="scss">

</style>