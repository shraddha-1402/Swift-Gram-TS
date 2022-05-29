import { useState, useEffect } from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { PostCard } from "../../components";
import { SortPosts } from "./components/SortPosts";
import { sortPosts } from "../../utils";
import { useAppSelector } from "../../app/hooks";
import { Posts } from "../../types";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const Explore = () => {
  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null) throw new Error("authUser null");
  const { posts, isPostLoading } = useAppSelector((store) => store.posts);
  const [sortingMethod, setSortingMethod] = useState("Latest");
  const [postFeed, setPostFeed] = useState<Posts.Post[]>([]);

  useEffect(() => {
    setPostFeed(sortPosts({ posts: [...posts], method: sortingMethod }));
  }, [posts, authUser, sortingMethod]);

  return (
    <>
      {isPostLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            padding: "0 2rem",
            margin: "2rem auto 5rem",
            maxWidth: "35rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Explore</Typography>
            <SortPosts
              sortingMethod={sortingMethod}
              setSortingMethod={setSortingMethod}
            />
          </Stack>

          {postFeed.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </Box>
      )}
    </>
  );
};

export { Explore };
