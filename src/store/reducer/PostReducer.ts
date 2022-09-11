import { IPostState, PostsAction, PostsActionTypes } from "../../types/types";

export const initialState: IPostState = {
    posts: [],
    loading: false,
    error: null,
};

export const postsReducer = (state = initialState, action: PostsAction): IPostState => {
    switch (action.type) {
        case PostsActionTypes.FETCH_POSTS:
            return { loading: true, error: null, posts: [] }
        case PostsActionTypes.FETCH_POSTS_SUCCESS:
            return { loading: false, error: null, posts: action.payload }
        case PostsActionTypes.FETCH_POSTS_ERROR:
            return { loading: false, error: action.payload, posts: [] }
        default:
            return state
    }
}