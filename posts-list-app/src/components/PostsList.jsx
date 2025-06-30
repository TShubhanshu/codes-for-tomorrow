import { usePosts } from "../context/PostsContext";
import { Card } from "./Card";
import { Pagination } from "./Pagination";
import { Loading } from '../components/Loading';
import '../App.css';

export function PostsList() {
    const { state, dispatch } = usePosts();
    const { posts, loading, currentPage, postsPerPage } = state;

    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    const paginate = pageNumber => dispatch({type: 'SET_CURRENT_PAGE', payload: pageNumber});

    const handleDelete = postId => {
        dispatch({ type: 'DELETE_POST', payload: postId});

        if(currentPosts.length === 1 && currentPage > 1){
            paginate(currentPage-1);
        }
    };

    if(loading){
        return <Loading/>;
    }

    return (
        <div className="posts-container">
            <h1>Posts</h1>
            <div className="cards-grid">
                {currentPosts.map(post => (
                    <Card key = {post.id} post={post} onDelete={handleDelete}/>

                ))}
            </div>
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            paginate={Pagination}
            />
        </div>
    );


}