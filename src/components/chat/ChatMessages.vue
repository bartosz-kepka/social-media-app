<template>
  <div class="main-container">
    <Spinner v-if="loading" />
    <div
      v-if="!loading && messages.length === 0"
      class="no-messages text-h6"
    >
      {{ $t('chat.conversation.no-messages') }}
    </div>
    <v-sheet
      class="pa-3"
      outlined
      rounded
    >
      <DynamicScroller
        ref="scroller"
        :buffer="100"
        :class="{'hidden' : !initComplete}"
        :items="messages"
        :min-item-size="20"
        class="scrollable"
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
              :class="isSender(item, user) ? 'justify-end' : ''"
              class="d-flex"
            >
              <v-tooltip
                :left="isSender(item, user)"
                :right="!isSender(item, user)"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-sheet
                    v-bind="attrs"
                    :color="isSender(item, user) ? 'primary' : 'secondary'"
                    class="message-item pa-2 ma-1"
                    rounded
                    v-on="on"
                  >
                    <div
                      v-if="!isSender(item, user) && chat.membersIds.length > 2"
                      class="text-caption"
                    >
                      {{ item.senderId }}
                    </div>
                    <div>{{ item.content }}</div>
                  </v-sheet>
                </template>
                <span>{{ item.date | datetime }}</span>
              </v-tooltip>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import Spinner from '@/components/shared/Spinner';

export default {
  name: 'Messages',
  components: { Spinner, DynamicScroller, DynamicScrollerItem },
  data() {
    return {
      initComplete: false,
    };
  },
  computed: {
    ...mapGetters({
      loading: 'chat/loading',
      chat: 'chat/chat',
      messages: 'chat/chatMessages',
      user: 'user/user',
    }),
  },
  watch: {
    messages() {
      this.scrollToBottom();
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
    window.removeEventListener('resize', () => {
      this.setMobileVhProperty();
    });
  },
  methods: {
    setMobileVhProperty() {
      const vh100 = window.innerHeight;
      document.documentElement.style.setProperty('--mobile-vh', `${vh100}px`);
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$refs.scroller?.scrollToBottom();
    },
    isSender(item, user) {
      return item.senderId === user.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;

  .no-messages {
    position: absolute;
    width: 100%;
    top: 12px;
    text-align: center;
    word-wrap: normal;
    overflow-wrap: anywhere;
  }

  .scrollable {
    height: calc(100vh - 56px - 132px); // fallback if next line is not supported

    // scroller height = whole viewport height - top app bar - paddings - bottom input container - scrollable container border x2
    @include respond-to($xs) {
      height: calc(var(--mobile-vh, 1vh) - 56px - 48px - 52px - 2px);
    }

    @include respond-to($sm) {
      height: calc(var(--mobile-vh, 1vh) - 56px - 48px - 52px - 2px);
    }

    @include respond-to($md) {
      height: calc(var(--mobile-vh, 1vh) - 64px - 48px - 52px - 2px);
    }

    @include respond-to($lg) {
      height: calc(var(--mobile-vh, 1vh) - 64px - 48px - 68px - 2px);
    }

    @include respond-to($xl) {
      height: calc(var(--mobile-vh, 1vh) - 64px - 48px - 68px - 2px);
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

    .message-item {
      display: inline-block;
      color: white;
      max-width: 75%;
      word-wrap: normal;
      overflow-wrap: anywhere;
    }
  }
}
</style>
