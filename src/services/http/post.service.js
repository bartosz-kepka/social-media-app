import $axios from '@/axios';

const baseURL = '/posts';

const PostService = {
    addPost(newPost) {
        return $axios.post(baseURL, newPost)
    },
    getPosts({params}){
        return $axios.get(baseURL, { params })
    },
    makeReaction(newReaction, postId){
        const url = `${baseURL}/${postId}/reactions`;
        return $axios.patch(url, newReaction).then();
    }
};
export default PostService;