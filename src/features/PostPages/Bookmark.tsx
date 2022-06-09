import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PostCard } from "../../components";
import { useAppSelector } from "../../app/hooks";
import type { Posts } from "../../types";
import { useDynamicTitle } from "../../hooks";

const Bookmark = () => {
  useDynamicTitle();
  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null) throw new Error("authuser null");
  const { posts } = useAppSelector((store) => store.posts);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Posts.Post[]>([]);

  useEffect(() => {
    const tempBookmarks: Posts.Post[] = [];
    if (authUser.bookmarks)
      authUser.bookmarks.forEach((postId) => {
        const tempPost = posts.find((post) => post._id === postId);
        if (tempPost) tempBookmarks.push(tempPost);
      });
    setBookmarkedPosts(tempBookmarks);
  }, [authUser, posts]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <Box>
        {bookmarkedPosts?.length > 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", margin: "1rem" }}
            >
              Your Bookmarks
            </Typography>
            {bookmarkedPosts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </>
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center", margin: "3rem" }}>
            No Bookmarks Yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export { Bookmark };
