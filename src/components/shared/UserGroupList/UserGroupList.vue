<template>
  <v-sheet
      v-if="userGroups.length > 0"
      outlined
      rounded
  >
    <v-list class="py-0">
      <template
          v-for="(group, groupIndex) in userGroups"
      >
        <UserGroupListItem
            :key="getGroupId(group)"
            :to="getRedirectLink ? getRedirectLink(group) : null"
            :link="!!getRedirectLink"
            :users-ids="getUsersIds(group)"
            :user-identities="userIdentities"
            :icon="icon"
            :on-icon-click="(userId) => onIconClick(userId, getGroupId(group))"
            :icon-color="iconColor"
        />
        <v-divider
            v-if="groupIndex !== userGroups.length - 1"
            :key="groupIndex"
        />
      </template>
    </v-list>
  </v-sheet>
</template>

<script>
import UserGroupListItem from '@/components/shared/UserGroupList/UserGroupListItem';

export default {
  name: 'UserGroupList',
  components: { UserGroupListItem },
  props: {
    userGroups: {
      type: Array,
      required: true,
    },
    userIdentities: {
      type: Object,
      required: true,
    },
    getGroupId: {
      type: Function,
      default: (group) => group.id,
    },
    getUsersIds: {
      type: Function,
      default: (group) => group.usersIds,
    },
    getRedirectLink: {
      type: Function,
    },
    icon: {
      type: String,
    },
    onIconClick: {
      type: Function,
    },
    iconColor: {
      type: String,
    }
  },
};
</script>

<style scoped>
</style>