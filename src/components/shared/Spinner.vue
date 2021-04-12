<template>
  <v-progress-circular
    :size="150"
    :width="15"
    class="spinner"
    color="primary"
    indeterminate
  />
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  left: calc(50% - 75px); // 75px is a half of spinner size
  top: calc(50% - 75px);
}
</style>
