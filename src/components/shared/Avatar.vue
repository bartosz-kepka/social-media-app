<template>
  <v-avatar
    class="avatar mr-2"
    :size="size"
  >
    <img
      :alt="alt"
      :src="require('@/assets/avatar.svg')"
    >
  </v-avatar>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    size: {
      type: Number,
      default: 56
    },
    alt: {
      type: String,
      default: 'Avatar'
    },
    src: {
      type: String,
      default: '@/assets/avatar.svg' // TODO display avatar using src prop
    }
  }
};
</script>

<style scoped lang="scss">
.avatar {
  border: 2px solid white;
}
</style>
