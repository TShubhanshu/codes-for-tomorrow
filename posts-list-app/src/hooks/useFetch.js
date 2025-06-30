import { useEffect } from "react";
import { usePosts } from "../context/PostsContext";

export function useFetch(){
    const context = usePosts();

    if(!context){
        throw new Error("useFetch must be used within a postsProvider");
    }
    const { dispatch } = context;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setTimeout(async () => {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                    const data = await response.json();
                    dispatch({type: 'SET_POSTS' , payload: data});
                    dispatch({type: 'SET_LOADING', payload: false});
                }, 5000);
            } catch(error){
                console.error('Error fetching posts' , error);
                dispatch({type: 'SET_LOADING', payload: false});
            }
        };
        fetchPosts();
    }, [dispatch]);
}