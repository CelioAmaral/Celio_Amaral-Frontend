import { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import Feed from "../../components/Feed";
import api from "../../services/api";
import { getAuthHeader, getProfile } from "../../services/auth";
import { Post } from "../../model/Post";
import { likePost, unlikePost } from "../../services/posts";


function Home() {
    const profile = getProfile();
    const [posts, setPosts] = useState<Post[]>([]);
    const authHeader = getAuthHeader();

    useEffect(() => {
        async function getPosts() {
            try {
                const { data } = await api.get("/feed", authHeader);
                setPosts(data);
            } catch (err) {
                alert("Erro ao obter o Feed.");
            }
        }

        getPosts();
    }, []);

    async function postCreated(post: Post) {
        try {
            const { data } = await api.get(`/posts/${post._id}`, authHeader);
            setPosts((posts) => [data, ...posts]);
        } catch (err) {
            alert("Erro ao tentar obter post salvo.")
        }
    }

    async function handleLike(postId: string) {
        const [post, ...rest] = posts.filter((post) => post._id == postId);

        try {
            if (post && !post.likes.includes(profile)) {
                const newPost = await likePost(post, profile);
                changePosts(newPost);
            } else {
                const newPost = await unlikePost(post, profile);
                changePosts(newPost);
            }
        } catch (err) {
            alert("Erro ao tentar realizar o like.");
        }
    }

    function changePosts(newPost: Post) {
        setPosts((posts) => {
            const index = posts.indexOf(newPost);
            posts[index] = newPost;
            return [...posts]
        });
    }

    return (
        <MainScreen postCreated={postCreated}>
            <Feed posts={posts} handleLike={handleLike} />
        </MainScreen>
    );

}

export default Home;