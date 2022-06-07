import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { Middlebar, PostCard } from "../../components";
import { useAppSelector } from "../../app/hooks";
import { SortPosts } from "../PostPages/components/SortPosts";
import { sortPosts } from "../../utils";
import { Posts } from "../../types";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const HomePage = () => {
  const { posts, isPostLoading } = useAppSelector((store) => store.posts);
  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null) throw new Error("authUser null");
  const [postFeed, setPostFeed] = useState<Posts.Post[]>([]);
  const [sortingMethod, setSortingMethod] = useState("Latest");

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        authUser.following.find(({ username }) => username === post.username) ||
        authUser.username === post.username
    );
    setPostFeed(sortPosts({ posts: filteredPosts, method: sortingMethod }));
  }, [posts, authUser, sortingMethod]);
  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <Middlebar />

      {isPostLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack
            maxWidth="35rem"
            margin="0 auto"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Posts</Typography>
            <SortPosts
              sortingMethod={sortingMethod}
              setSortingMethod={setSortingMethod}
            />
          </Stack>
          {postFeed?.length > 0 ? (
            postFeed.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })
          ) : (
            <Typography variant="h5" textAlign="center" marginTop="2rem">
              Follow people to see their posts
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export { HomePage };
