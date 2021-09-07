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
          <v-icon class="mr-2">mdi-pencil</v-icon>
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
              v-model="post.content"
              outlined
              :placeholder="$t('posts.create.write-something')"
              clearable
              counter="1024"
              rows="4"
              :error-messages="contentErrors"
              @blur="$v.post.content.$touch()"
              @input="$v.post.content.$touch()"
          />
          <v-card-actions class="justify-space-between py-3">
            <v-btn
                @click="cancel"
                text
                :disabled="loading"
            >
              {{ $t('general.cancel') }}
            </v-btn>

            <v-btn
                color="primary"
                @click="addPost"
                :loading="loading"
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
import { maxLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'NewPostButton',
  data() {
    return {
      post: {
        content: '',
      },
      dialog: false,
      loading: false,
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    addPost() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      this.$store.dispatch('post/addPost', this.post).then(
          () => {
            this.dialog = false;
            this.$store.dispatch('post/fetchPostsPage');
          },
      ).finally(() => this.loading = false);
      this.post.content = '';
      this.$v.$reset();
    },
  },
  computed: {
    contentErrors() {
      const errors = [];
      if (!this.$v.post.content.$dirty) {
        return errors;
      }
      if (!this.$v.post.content.required) {
        errors.push(this.$t('posts.create.error-content-required'));
      }
      if (!this.$v.post.content.maxLength) {
        errors.push(this.$t('posts.create.error-max-length'));
      }
      return errors;
    },
  },
  validations: {
    post: {
      content: {
        required,
        maxLength: maxLength(1024),
      },
    },
  },
};
</script>

<style scoped lang="scss">

</style>