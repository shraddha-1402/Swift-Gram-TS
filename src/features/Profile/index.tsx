import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { UserInfoCard } from "./components/UserInfoCard";
import { PostCard } from "../../components";
import { getUserPosts, getUserProfileDetails } from "..";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null || username === undefined)
    throw new Error("authUser null or username undefined");

  const { userPosts: currUserPosts, isProfileLoading } = useAppSelector(
    (store) => store.profile
  );
  const { posts, isPostContentLoading } = useAppSelector(
    (store) => store.posts
  );

  useEffect(() => {
    dispatch(getUserProfileDetails(username));
    dispatch(getUserPosts(username));
  }, [username, authUser, dispatch, posts]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      <UserInfoCard />
      {isProfileLoading && isPostContentLoading ? (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ margin: "3rem 0" }}>
          {currUserPosts?.length > 0 ? (
            currUserPosts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })
          ) : (
            <Typography sx={{ textAlign: "center" }} variant="h4">
              No posts yet
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export { ProfilePage };
