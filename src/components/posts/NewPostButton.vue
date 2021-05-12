<template>
  <v-dialog 
    v-model="dialog"
    max-width="800"
    persistent
  >
    <template v-slot:activator="{on, attrs}">
      <v-fab-transition>
        <v-btn
          v-bind="attrs"
          class="new_post_button"
          color="primary"
          dark
          block
          v-on="on"
        >
          <v-icon>mdi-pencil</v-icon>
          {{ $t('posts.create.add-new-post') }}
        </v-btn>
      </v-fab-transition>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('posts.create.title') }}
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent="addPost"
        >
          <v-textarea
            v-model="post.newPostContent"
            outlined
            :placeholder="$t('posts.create.write-something')"
            clearable
            counter
            rows="4"
          />
          <v-card-actions class="justify-space-between py-3">
            <v-btn
              @click="cancel"
            >
              {{ $t('general.cancel') }}
            </v-btn>

            <v-btn
              color="primary"
              @click="addPost"
            >
              {{ $t('general.add') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import PostService from '../../services/http/post.service';

export default {
  name: 'NewPostButton',
  data(){
    return{
      post: {
        id: '',
        content: ''
      },
      dialog: false,
    }
  },
  methods:{
    cancel(){
      this.dialog = false;
      this.post.newPostContent = '';
    },

    addPost(){
      const newPost = {
        content: this.post.newPostContent,
      };
      PostService.addPost(newPost)
      this.dialog = false;
      this.post.newPostContent = '';
      this.post.content = '';
    },
  }
};
</script>

<style scoped lang="scss">

</style>