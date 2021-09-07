import $axios from '@/axios';

const baseURL = '/posts';

const PostService = {
    addPost(newPost) {
        return $axios.post(baseURL, newPost)
    },
    getPosts(params){
        return $axios.get(baseURL, { params })
    },
    makeReaction(postId, type){
        const url = `${baseURL}/${postId}/reactions`;
        return $axios.patch(url, { type }).then();
    }
};
export default PostService;