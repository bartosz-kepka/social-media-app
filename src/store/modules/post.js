import PostService from '../../services/http/post.service';

export default {
    namespaced: true,
    actions: {
        makeReaction({rootState}, {postId, type}) {
            const newReaction = {
                 senderId: rootState.user.user.firstName,
                type,
            };
          PostService.makeReaction(newReaction, postId)
        },

        socket_makeReaction({commit}, postId, reactions) {
            const postReactions = {postId, reactions};
            commit('newPostReaction', postReactions);
            return;
        }
    }
}