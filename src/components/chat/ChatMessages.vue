<template>
  <div>
    <div
      v-if="loading"
      class="spinner"
    >
      <v-progress-circular
        :size="150"
        :width="15"
        color="primary"
        indeterminate
      />
    </div>
    <v-sheet
      class="pa-3"
      outlined
      rounded
    >
      <DynamicScroller
        ref="scroller"
        :class="{'hidden' : !initComplete}"
        :items="messages"
        :min-item-size="20"
        :buffer="100"
        class="scroller"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :active="active"
            :data-index="item.id"
            :item="item"
            :size-dependencies="[
              item.content,
            ]"
          >
            <div
              :class="item.senderId === user.name ? 'justify-end' : ''"
              class="d-flex"
            >
              <v-sheet
                :color="item.senderId === user.name ? 'primary' : 'secondary'"
                class="message-item pa-2 ma-1"
                rounded
              >
                {{ item.content }}
              </v-sheet>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </v-sheet>
  </div>
</template>

<script>

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { mapGetters } from 'vuex';

export default {
  name: 'Messages',
  components: { DynamicScroller, DynamicScrollerItem },
  data() {
    return {
      initComplete: false,
    };
  },
  computed: {
    ...mapGetters({
      loading: 'chat/chatsLoading',
      messages: 'chat/chatMessages',
      user: 'user/user',
    }),
  },
  watch: {
    messages() {
      this.$refs.scroller?.scrollToBottom();
      if (!this.initComplete) {
        this.initComplete = true;
      }
    },
  },
  mounted() {
    this.setMobileVhProperty();
    window.addEventListener('resize', () => {
      this.setMobileVhProperty();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize',() => {
      this.setMobileVhProperty();
    });
  },
  methods: {
    setMobileVhProperty() {
      const vh100 = window.innerHeight;
      document.documentElement.style.setProperty('--mobile-vh', `${vh100}px`);
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  left: calc(50% - 75px); // 75px is a half of spinner size
  top: calc(50% - 75px);
}

.scroller {
  height: calc(100vh - 56px - 132px); // fallback if next line is not supported
  height: calc(var(--mobile-vh, 1vh) - 56px - 104px); // scroller height = window height - app bar - paddings and bottom input container

  @include respond-to($md) {
    height: calc(var(--mobile-vh, 1vh) - 64px - 104px);
  }

  @include respond-to($lg) {
    height: calc(var(--mobile-vh, 1vh) - 64px - 144px);
  }

  @include respond-to($xl) {
    height: calc(var(--mobile-vh, 1vh) - 64px - 144px);
  }

  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &.hidden {
    visibility: hidden;
  }
}

.message-item {
  display: inline-block;
  color: white;
  max-width: 75%;
  word-wrap: normal;
  overflow-wrap: anywhere;
}
</style>
