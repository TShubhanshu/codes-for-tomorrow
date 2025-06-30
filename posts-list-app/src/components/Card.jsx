import '../App.css';

export function Card({post , onDelete}){
    return(
        <div className="card">
            <button className="delete-btn" onClick={() => onDelete(post.id)}>
                X
            </button>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    );
}