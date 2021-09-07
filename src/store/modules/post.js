import PostService from '@/services/http/post.service';
import { normalizeUserIdentities } from '@/utils/identity';
import i18n from '@/locales/i18n';
import { NOTIFICATION_TYPES } from '@/store/modules/notification';

const createNewReactionNotification = (senderIdentity, reactionType) => {
  if (reactionType === 'like') {
    return {
      message: i18n.t(
        'notifications.new-like',
        { sender: senderIdentity.fullName },
      ),
      type: NOTIFICATION_TYPES.INFO,
    };
  }

  return {
    message: i18n.t(
      'notifications.new-dislike',
      { sender: senderIdentity.fullName },
    ),
    type: NOTIFICATION_TYPES.WARNING,
  };
};

export default {
  namespaced: true,
  state: {
    loading: false,
    userIdentities: {},
    posts: [],
    totalPages: 0,
    page: 0,
    pageSize: 8,
    size: 8,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    addUserIdentities(state, userIdentities) {
      state.userIdentities = {
        ...state.userIdentities,
        ...normalizeUserIdentities(userIdentities),
      };
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setPage(state, page) {
      state.page = page;
    },
    setPageSize(state, pageSize) {
      state.pageSize = pageSize;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    addPost(_, newPost) {
      return PostService.addPost(newPost);
    },
    fetchPostsPage({ commit }, params) {
      const searchParams = {
        page: 0,
        pageSize: 8,
        ...params,
      };

      commit('setPage', searchParams.page);
      commit('setPageSize', searchParams.size);

      commit('setLoading', true);
      return PostService.getPosts(searchParams).then(
        ({ data: { payload, userIdentities } }) => {
          const { items, totalPages } = payload;
          commit('addUserIdentities', userIdentities);
          commit('setPosts', items);
          commit('setTotalPages', totalPages);
        },
      ).finally(() => commit('setLoading', false));
    },
    makeReaction({state, rootState}, { postId, type }) {
      const currentUserId = rootState.user.user.id;
      const post = state.posts.find(({ id }) => id === postId);
      if (post.reactions[currentUserId] === type) return;
      return PostService.makeReaction(postId, type);
    },
    socket_newPostReaction({ commit, rootState, state }, { payload, userIdentities }) {
      commit('addUserIdentities', userIdentities);
      let { postId, senderId, reaction } = payload;
      const posts = state.posts;
      const postIndex = posts.findIndex(({ id }) => id === postId);
      if (postIndex !== -1) {
        const post = posts[postIndex];
        const newReactions = {
          ...post.reactions,
          [senderId]: reaction,
        };
        post.reactions = newReactions;
        posts[postIndex] = post;
        commit('setPosts', posts);
        const currentUserId = rootState.user.user.id;
        if (senderId !== currentUserId && post.creatorId === currentUserId) {
          const notification = createNewReactionNotification(state.userIdentities[senderId], reaction);
          this.dispatch('notification/showNotification', notification);
        }
      }
    },
  },
  getters: {
    loading: state => state.loading,
    posts: state => state.posts,
    userIdentities: state => state.userIdentities,
    page: state => state.page,
    totalPages: state => state.totalPages,
    pageSize: state => state.pageSize,
  },
};