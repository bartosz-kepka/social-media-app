<template>
  <v-list-item v-bind="$attrs">
    <v-list-item-content>
      <div
          class="d-flex"
          v-for="(userId, userIndex) in usersIds"
          :key="userId"
          :class="{ 'mb-2': userIndex !== usersIds.length - 1 }"
      >
        <UserIdentity
            class="flex-fill"
            :user-identity="userIdentities[userId]"
        />
        <v-btn
            v-if="icon"
            icon
            :color="iconColor"
            outlined
            small
            @click.stop="onIconClick(userId)"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import UserIdentity from '@/components/shared/UserIdentity';

export default {
  name: 'UserGroupListItem',
  components: { UserIdentity },
  props: {
    usersIds: {
      type: Array,
      required: true,
    },
    userIdentities: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
    },
    onIconClick: {
      type: Function,
    },
    iconColor: {
      type: String,
      default: 'primary'
    }
  },
};
</script>

<style scoped>

</style>