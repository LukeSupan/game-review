export default function Post({ title, body }) {
    return (
        <div classNmae="post-container">
            <h3 className="post-title">{title}</h3>
            <p className="post-body">{body}</p>
        </div>
    );
}