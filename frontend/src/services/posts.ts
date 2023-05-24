import { Post } from "../model/Post";
import api from "./api";
import { getAuthHeader } from "./auth";

async function likePost(post: Post, profile: string): Promise<Post> {
    api.post(`/posts/${post._id}/like`, null, getAuthHeader());
    return like(post, profile);
}

function like(post: Post, profile: string) {
    post.likes.push(profile);
    return post;
}

async function unlikePost(post: Post, profile: string): Promise<Post> {
    api.post(`/posts/${post._id}/unlike`, null, getAuthHeader());
    return unlike(post, profile);
}

function unlike(post: Post, profile: string) {
    const index = post.likes.indexOf(profile);
    post.likes.splice(index, 1);
    return post;
}

export { likePost, unlikePost };