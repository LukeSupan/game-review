import React from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";


export default function HomePage() {
    const [posts, setPosts] = useState([]);

    // we get a new post, then get the posts that currently exist, and return an array with those posts + the new post just created (thats what the ... does)
    // Date.now creates an ID for the post based on the date
    const handleAddPost = (newPost) => {
        setPosts((prev) => [...prev, { ...newPost, id: Date.now() }])
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
                        <Post key={post.id} title={post.title} body={post.body} />
                    ))
                )}
            </div>
        </div>
    );
}
