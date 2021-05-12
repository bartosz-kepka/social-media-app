<template>
  <div>
    <NewPostButton />
    <p />
    <PostsList />
  </div>
</template>

<script>
import NewPostButton from '@/components/posts/NewPostButton';
import PostsList from '@/components/posts/PostsList';

export default {
  name: 'Home',
  components: {NewPostButton, PostsList},
};
</script>
