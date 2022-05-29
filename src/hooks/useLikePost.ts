import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { dislikePost, likePost } from "../features";
import { Posts } from "../types";

export const useLikePosts = (post: Posts.Post) => {
  const dispatch = useAppDispatch();
  const [isLiked, setLiked] = useState(false);
  const { posts } = useAppSelector((store) => store.posts);
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (token === null) throw new Error("token null");

  useEffect(() => {
    (() => {
      if (
        authUser &&
        Boolean(
          post.likes.likedBy.find(
            (currUsername) => currUsername === authUser.username
          )
        )
      )
        setLiked(true);
      else setLiked(false);
    })();
  }, [post, authUser, posts]);

  const handlelikes = () => {
    if (isLiked) dispatch(dislikePost({ postId: post._id, token }));
    else dispatch(likePost({ postId: post._id, token }));
  };
  return { isLiked, handlelikes };
};
