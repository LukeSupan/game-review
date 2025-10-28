import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";


export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/posts`);
                if (!res.ok) throw new Error("Failed to fetch posts");
                const data = await res.json();
                setPosts(data);
            }   catch (err) {
                console.error(err);
            }
        };

        fetchPosts();
    }, []);

    // we get a new post, then get the posts that currently exist, and return an array with those posts + the new post just created (thats what the ... does)
    // Date.now creates an ID for the post based on the date
    const handleAddPost = async (newPost) => {
        try {
            const res = await fetch(`${backendUrl}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });

            if (!res.ok) throw new Error("Failed to create post");
            const createdPost = await res.json();
            setPosts((prev) => [...prev, createdPost]);

            }   catch (err) {
                console.error(err);
            }
    };

    return (
        <div className="home-page">
            <Welcome />

            <CreatePost onSubmit={handleAddPost}/>

            {/* Contains and displays post array */}
            <div className="posts-container">
                {posts.length === 0 ? (
                    <p className="posts-empty-text">No posts yet.</p>
                ) : (
                    posts.map((post) => (
                        <Post key={post._id} title={post.title} body={post.body} />
                    ))
                )}
            </div>
        </div>
    );
}
