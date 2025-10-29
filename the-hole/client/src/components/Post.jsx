import { useState } from "react";

export default function Post({ post, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);


    // on click, set isEditing to true
    const handleEditClick = () => setIsEditing(true);

    const handleCancel = () => {
        setEditedTitle(post.title);
        setEditedBody(post.body);
        setIsEditing(false);
    }

    const handleSave = () => {
        onUpdate({ title: editedTitle, body: editedBody });
        setIsEditing(false);
    }

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
                    <p className="post-body">{post.body}</p>
                    <button onClick={handleEditClick} className="edit-post-buttons">Edit</button>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </>
            )}
        </div>
    );
}