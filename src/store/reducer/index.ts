import { combineReducers } from "redux"
import { postsReducer } from "./PostReducer"
import { userReducer } from "./userReducer"

export const rootReducer = combineReducers({
    user: userReducer,
    post: postsReducer
})