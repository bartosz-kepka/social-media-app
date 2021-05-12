<template>
  <div>
    <v-list
      class="py-0 mb-12"
      outlined
      rounded
      width="100%"
      color="transparent"
    >
      <template v-for="(post) in posts">
        <v-list-item
          :key="post.id"
        >
          <v-list-item-content>
            <v-card
              class="pa-5"
              min-height="90"
            >
              {{ post.content }}
            </v-card>
          </v-list-item-content>
          <v-btn
            class="ma-2"
            icon
            color="primary"
            @click="giveReaction(post.id, 'like')"
          >
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          {{ showReactions(post.reactions, 'like') }}
          <v-btn
            class="ma-2"
            color="error"
            icon
            @click="giveReaction(post.id, 'dislike')"
          >
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
          {{ showReactions(post.reactions, 'dislike') }}
        </v-list-item>
      </template>
    </v-list>
    <v-bottom-navigation
      fixed
      background-color="transparent"
    >
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="5"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        @input="handlePageChange"
      />
    </v-bottom-navigation>
  </div>
</template>

<script>
import PostService from '../../services/http/post.service';

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
      page: 1,
      totalPages: 0,
      pageSize: 8,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    giveReaction(id, type) {
      this.$store.dispatch('post/makeReaction', {
        postId: id,
        type,
      });
    },

    showReactions(reactions, type){
      let reactionsObj = Object.assign({}, reactions)
      let reactionsArr = Object.values(reactionsObj)
      let reaction = 0

      for(let i = 0; i < reactionsArr.length; i++){
        if(reactionsArr[i] === type) reaction++
      }
      return reaction
    },

    getRequestParams(page, pageSize) {
      let params = {};

      if (page) {
        params['page'] = page - 1;
      }

      if (pageSize) {
        params['size'] = pageSize;
      }

      return params;
    },

    getPosts(){
      const params = this.getRequestParams(
          this.page,
          this.pageSize
      );

     PostService.getPosts({params})
          .then((response) => {

            const { posts, totalPages } = response.data;
            this.posts = posts;
            this.totalPages = totalPages;
          })
    },
    handlePageChange(value) {
      this.page = value;
      this.getPosts();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.getPosts();
    },

  }
}

</script>

<style lang="scss" scoped>
</style>






