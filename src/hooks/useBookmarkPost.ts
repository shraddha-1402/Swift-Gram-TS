import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removePostFromBookmark, addPostToBookmark } from "../features";
import { Posts } from "../types";

export const useBookmarkPost = (post: Posts.Post) => {
  const dispatch = useAppDispatch();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { posts } = useAppSelector((store) => store.posts);
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (token === null) throw new Error("token null");

  useEffect(() => {
    (() => {
      if (
        authUser &&
        authUser.bookmarks.length > 0 &&
        Boolean(
          authUser.bookmarks.find((currPostId) => currPostId === post._id)
        )
      )
        setIsBookmarked(true);
      else setIsBookmarked(false);
    })();
  }, [post, authUser, posts]);

  const handleBookmark = () => {
    if (isBookmarked)
      dispatch(removePostFromBookmark({ postId: post._id, token }));
    else dispatch(addPostToBookmark({ postId: post._id, token }));
  };
  return { isBookmarked, handleBookmark };
};
