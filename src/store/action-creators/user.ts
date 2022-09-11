import axios from "axios"
import { Dispatch } from "redux"
import { IUser, UserAction, UserActionTypes } from "../../types/types"


function sortUsers(arr: IUser[]): IUser[] {
    console.log(arr);
    return arr.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });
}

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.FETCH_USERS })
            const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
            dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data })
            // dispatch({ type: UserActionTypes.SET_USERS, payload: sortUsers(response.data) })
        } catch (error) {
            dispatch({ type: UserActionTypes.FETCH_USERS_ERROR, payload: "Error" })
        }
    }
}