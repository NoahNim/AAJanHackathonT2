'use client'
import { BlogLike } from "./bloglike";
import { CommentLike } from "./commentlike";



export const Likes = () => {

    return (
        <div>
            <BlogLike />

            <CommentLike />
        </div>
    )
}