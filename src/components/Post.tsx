import React, { FC } from "react";
import { IPost } from "../types/types";

export const Post: FC<IPost> = ({ userId, id, title, body }) => {
	return <div>Post</div>;
};
