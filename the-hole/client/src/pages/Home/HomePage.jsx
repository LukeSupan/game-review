import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import Welcome from "../../components/Welcome";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";



export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // after rendering this a component, it also calls fetchPosts to get posts
    // without it, the posts state would remain empty besides the ones added on frontend
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setIsAdmin(decoded.admin);
        }
    })

    // we get a new post, then get the posts that currently exist, and return an array with those posts + the new post just created (thats what the ... does)
    // Date.now creates an ID for the post based on the date
    const handleAddPost = async (newPost) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${backendUrl}/api/posts`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
                body: JSON.stringify(newPost),
            });

            if (!res.ok) throw new Error("Failed to create post");
            const createdPost = await res.json();
            setPosts((prev) => 
                [createdPost, ...prev]);

            }   catch (err) {
                console.error(err);
            }
    };

    // given id and the updated post, go into DB and update the correct post
    const handleUpdatePost = async (id, updatedPost) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${backendUrl}/api/posts/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
                body: JSON.stringify(updatedPost),
            });

            if (!res.ok) throw new Error("Failed to update post");

            // update the post
            setPosts((prev) =>
                prev.map((post) =>

                    (post._id === id 
                        ? { ...post, ...updatedPost } 
                        : post)
                )
            );
            
        }   catch (err) {
            console.error(err);
        }
    };

        const handleDeletePost = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${backendUrl}/api/posts/${id}`, {
                method: "DELETE",
                headers: { 
                "Authorization": `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to delete post");

            setPosts((prev) =>
                prev.filter((post) => post._id !== id)
            );

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="home-page">
            <Welcome />

            {/* only shows up if user is an admin */}
            {isAdmin && <CreatePost onSubmit={handleAddPost} />}

            {/* Contains and displays post array */}
            <div className="posts-container">
                {posts.length === 0 ? (
                    <p className="posts-empty-text">No posts yet.</p>
                ) : (
                    posts.map((post) => (
                        <Post
                            key={post._id} 
                            post={post}
                            onUpdate={(updatedData) => handleUpdatePost(post._id, updatedData)}
                            onDelete={() => handleDeletePost(post._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
