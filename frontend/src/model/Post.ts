export interface Post {
    _id: string;
    title: string;
    description: string;
    profile: {
        name: string;
    };
    comments: string[];
    likes: string[];
    image: boolean;
}