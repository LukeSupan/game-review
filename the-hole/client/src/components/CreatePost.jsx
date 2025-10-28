import { useState } from "react";

export default function CreatePost({ onSubmit} ) {
    // Variables for the title and body of the post
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // trim the title and body. submit the title and body when done and reset the title and body back to nothing (because it was added)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;
        onSubmit({ title, body });
        setTitle("");
        setBody("");
    };

    return (
        // create post is always at the top of the screen for admins
        <div className="create-post-container">
            <h2 className="create-post-title">Create New Post</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="create-post-form-title"
                />
                <textarea
                    placeholder="Say something. The people... are listening."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="create-post-form-body"
                />
                <button
                    type="submit"
                    className="create-post-form-button"
                >
                    Publish
                </button>
            </form>
        </div>
        
    );
}

