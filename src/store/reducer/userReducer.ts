import { IUserState, UserAction, UserActionTypes } from "../../types/types";

export const initialState: IUserState = {
    users: [],
    loading: false,
    error: null,
    sortedUsers: []
};

export const userReducer = (state = initialState, action: UserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return { loading: true, error: null, users: [], sortedUsers: [] }
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { loading: false, error: null, users: action.payload, sortedUsers: [] }
        case UserActionTypes.FETCH_USERS_ERROR:
            return { loading: false, error: action.payload, users: [], sortedUsers: [] }
        case UserActionTypes.SET_USERS:
            return { loading: false, error: null, users: state.users, sortedUsers: action.payload }
        default:
            return state
    }
}