<template>
  <Spinner v-if="loading"/>
  <div v-else>
    <v-list
        class="pa-0 mb-12"
        outlined
        rounded
        width="100%"
        color="transparent"
    >
      <template v-for="(post) in posts">
        <v-list-item
            :key="post.id"
            class="px-0 py-0 ma-0"
        >
          <v-list-item-content :class="{'py-2': $vuetify.breakpoint.md, 'py-1': $vuetify.breakpoint.smAndDown}">
            <v-card
                class="pt-1 pb-2 px-3"
                min-height="88"
                outlined
            >
              <v-card-title class="pa-0 ma-0">
                <UserIdentity :user-identity="userIdentities[post.creatorId]" />
              </v-card-title>
              <div class="ml-10">
                {{ post.content }}
              </div>
            </v-card>
          </v-list-item-content>
          <div class="d-flex flex-column justify-center align-center">
            <div>
              <v-btn
                  class="ma-1"
                  icon
                  :outlined="post.reactions[userId] === 'like'"
                  color="primary"
                  @click="giveReaction(post.id, 'like')"
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
              {{ showReactions(post.reactions, 'like') }}
            </div>
            <div>
              <v-btn
                  class="ma-1"
                  color="error"
                  icon
                  :outlined="post.reactions[userId] === 'dislike'"
                  @click="giveReaction(post.id, 'dislike')"
              >
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
              {{ showReactions(post.reactions, 'dislike') }}
            </div>
          </div>
        </v-list-item>
      </template>
    </v-list>
    <div class="pagination-container">
      <v-pagination
          :value="page + 1"
          :length="totalPages"
          total-visible="5"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @input="handlePageChange"
          class="pagination"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Spinner from '@/components/shared/Spinner';
import UserIdentity from '@/components/shared/UserIdentity';

export default {
  name: 'PostList',
  components: { UserIdentity, Spinner },
  computed: {
    ...mapGetters({
      loading: 'post/loading',
      posts: 'post/posts',
      userIdentities: 'post/userIdentities',
      page: 'post/page',
      totalPages: 'post/totalPages',
      pageSize: 'post/pageSize',
      userId: 'user/userId',
    }),
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    giveReaction(postId, type) {
      this.$store.dispatch('post/makeReaction', { postId, type });
    },
    showReactions(reactions, type) {
      let reactionsArr = Object.values(reactions);
      let reaction = 0;

      for (let i = 0; i < reactionsArr.length; i++) {
        if (reactionsArr[i] === type) reaction++;
      }
      return reaction;
    },
    getPosts(params) {
      this.$store.dispatch('post/fetchPostsPage', params).then();
      console.log(this.posts);
    },
    handlePageChange(page) {
      this.getPosts({ page: page - 1 });
    },
  },
};

</script>

<style lang="scss" scoped>
.pagination-container {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 50%;

  @include respond-to($xs) {
    width: 600px;
    margin-left: -300px;
  }

  @include respond-to($sm) {
    width: 600px;
    margin-left: -300px;
  }

  @include respond-to($md) {
    width: 600px;
    margin-left: -300px;
  }

  @include respond-to($lg) {
    width: 600px;
    margin-left: -300px + 128px;
  }

  @include respond-to($xl) {
    width: 600px;
    margin-left: -300px + 128px;
  }
}
</style>






