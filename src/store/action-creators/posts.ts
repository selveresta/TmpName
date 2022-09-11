import axios from "axios"
import { Dispatch } from "redux"
import { IPost, PostsAction, PostsActionTypes } from "../../types/types"

export const fetchPosts = () => {
    return async (dispatch: Dispatch<PostsAction>) => {
        try {
            dispatch({ type: PostsActionTypes.FETCH_POSTS })
            const response = await axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts");
            dispatch({ type: PostsActionTypes.FETCH_POSTS_SUCCESS, payload: response.data })

        } catch (error) {
            dispatch({ type: PostsActionTypes.FETCH_POSTS_ERROR, payload: "Error" })
        }
    }
}