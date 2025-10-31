// ignore redundant comments, its for learning

// jwtDecode to show proper frontend
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function Post({ post, onUpdate, onDelete }) {
    // variables with useState.
    // first is current state, second lets you change it
    // useState(x) is the default value
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            setIsAdmin(decoded.admin);
        }
    }, []);


    // on click, set isEditing to true
    // => is function syntax. ill try to use that as much as i can instead of {}. apparently its better
    const handleEditClick = () => setIsEditing(true);

    // when the cancel button is hit, reset all parts of the post, turn off edit mode
    const handleCancel = () => {
        setEditedTitle(post.title);
        setEditedBody(post.body);
        setIsEditing(false);
    }

    // when you save, set the title and body to the current edit text, turn off edit mode
    const handleSave = () => {
        onUpdate({ title: editedTitle, body: editedBody });
        setIsEditing(false);
    }

    // when you hit the delete button, show an alert, then delete the post with the ID of the button
    const handleDelete = () => {
        if (window.confirm("Do you want to delete this post?")) {
            onDelete(post._id);
        }
    }

    return (
        // allow editing
        <div className="post-container">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="edit-post-title"
                    />

                    <textarea
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                        className="edit-post-body"
                    />

                    <div className="edit-post-buttons">

                        <button onClick={handleSave} className="save-button">Save</button>

                        <button onClick={handleCancel} className="cancel-button">Cancel</button>

                        

                    </div>
                </>
            ) : (
                <>
                    <h3 className="post-title">{post.title}</h3>

                    {post.adminName && (
                        <p className="post-author">Author: {post.adminName}</p>
                    )}

                    <p className="post-body">{post.body}</p>
                    
                    { /* Don't display these if user isn't an admin */}
                    {isAdmin && (
                        <>
                            <button onClick={handleEditClick} className="edit-post-buttons">Edit</button>
                            <button onClick={handleDelete} className="delete-button">Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}