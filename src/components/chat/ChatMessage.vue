<template>
  <div
      :class="isSender ? 'justify-end' : ''"
      class="d-flex"
  >
    <v-tooltip
        :left="isSender"
        :right="!isSender"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-sheet
            v-bind="attrs"
            :color="isSender ? 'primary' : 'secondary'"
            class="message-item pa-2 ma-1"
            rounded
            v-on="on"
        >
          <div
              v-if="!isSender && moreThanTwoMembers"
              class="text-caption"
          >
            {{ displayedName }}
          </div>
          <div>{{ message.content }}</div>
        </v-sheet>
      </template>
      <span>{{ message.date | datetime }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatMessage',
  props: {
    message: Object,
    moreThanTwoMembers: Boolean,
  },
  computed: {
    ...mapGetters({
      userId: 'user/userId',
      userIdentities: 'chat/userIdentities',
    }),
    displayedName() {
      return this.userIdentities[this.message.senderId]?.fullName || this.message.senderId;
    },
    isSender() {
      return this.message.senderId === this.userId;
    },
  },
};
</script>

<style scoped>

</style>