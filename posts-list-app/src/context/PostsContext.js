import { createContext, useContext, useReducer } from 'react';
const PostsContext = createContext();

const ActionTypes = {
    SET_POSTS: 'SET_POSTS',
    SET_LOADING: 'SET_LOADING',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    DELETE_POST: 'DELETE_POST'
}

const initialState = {
    posts: [],
    loading: true,
    currentPage: 1,
    postsPerPage: 6,
};

//const PostsContext = createContext();

function reducer(state, action){
    switch (action.type){
        case ActionTypes.SET_POSTS:
            return { ...state, posts: action.payload};
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload};
        case ActionTypes.SET_CURRENT_PAGE:
            return { ...state, currentPage: Math.max(1,Math.min(action.payload, Math.ceil(state.posts.length/state.postsPerPage)))};
        case ActionTypes.DELETE_POST:
            return { ...state, 
                    posts: state.posts.filter(post => post.id !== action.payload),

            };  
        default: 
            return state;
    }
}

export function PostsProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PostsContext.Provider value = {{state, dispatch}}>{children}</PostsContext.Provider>
    );
}

export function usePosts(){
    const context = useContext(PostsContext);
    if(context === undefined){
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
}