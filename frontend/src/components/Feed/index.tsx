import { UserCircle } from "@phosphor-icons/react";
import Heading from "../Heading";
import Text from "../Text";
import { Post } from "../../model/Post";
import PostItem from "../PostItem";

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void;
}

function Feed({ posts, handleLike }: FeedProps) {
    return (
        <div className="basic-5/6 overflow-y-auto scroll-smooth">
            <Heading className="border-b border-slate-400 pl-5 mt-4">
                <Text size="lg" className="font-extrabold ml-5">
                    Página Inicial
                </Text>
                <div className="flex items-center ml-5 my-4">
                    <UserCircle size={32} weight="light" className="text-slate-50" />
                    <Text className="font-extrabold ml-2">Célio Amaral</Text>
                </div>
            </Heading>
            <section>
                {posts &&
                    posts.map((post: Post) =>
                        <PostItem post={post} handleLike={handleLike} key={post._id} />
                    )}
            </section>
        </div>
    );
}

export default Feed;