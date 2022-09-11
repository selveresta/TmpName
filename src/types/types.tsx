export interface IUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	type: boolean;
	clickPosts: () => void;
	idPost: (id: number) => void;
}

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IUserState {
	users: any[];
	loading: boolean;
	error: null | string;
}

export interface IPostState {
	posts: any[];
	loading: boolean;
	error: null | string;
}

export enum UserActionTypes {
	FETCH_USERS = "FETCH_USERS",
	FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCES",
	FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

export enum PostsActionTypes {
	FETCH_POSTS = "FETCH_POSTS",
	FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
	FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR",
}

interface IFetchUserAction {
	type: UserActionTypes.FETCH_USERS;
}

interface IFetchUserSUCCESSAction {
	type: UserActionTypes.FETCH_USERS_SUCCESS;
	payload: any;
}

interface IFetchUserERRORAction {
	type: UserActionTypes.FETCH_USERS_ERROR;
	payload: string;
}

interface IFetchPostAction {
	type: PostsActionTypes.FETCH_POSTS;
}

interface IFetchPostSUCCESSAction {
	type: PostsActionTypes.FETCH_POSTS_SUCCESS;
	payload: any;
}

interface IFetchPostERRORAction {
	type: PostsActionTypes.FETCH_POSTS_ERROR;
	payload: string;
}

export type UserAction = IFetchUserAction | IFetchUserSUCCESSAction | IFetchUserERRORAction;

export type PostsAction = IFetchPostAction | IFetchPostSUCCESSAction | IFetchPostERRORAction;
