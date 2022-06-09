import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { commentOnPost, deleteCommentOnPost } from "..";
import { PostCard } from "../../components";
import { LocalRoutes, postInitialState } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Posts } from "../../types";
import { useDynamicTitle } from "../../hooks";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
};

const SinglePostPage = () => {
  useDynamicTitle();
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { posts, isPostContentLoading } = useAppSelector(
    (store) => store.posts
  );
  const { token, user: authUser } = useAppSelector((store) => store.auth);
  if (postId === undefined || token === null || authUser === null)
    throw new Error("postid or token null");

  const [currPost, setCurrPost] = useState<Posts.Post>(postInitialState);
  const [commentData, setCommentData] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const tempPost = posts.find(({ _id }) => _id === postId);
    if (tempPost) setCurrPost(tempPost);
  }, [postId, posts]);

  const handlePostComment = () => {
    setIsPosting(true);
    dispatch(commentOnPost({ postId, token, commentData }));
    if (!isPostContentLoading) {
      setCommentData("");
      setIsPosting(false);
    }
  };

  const handleDeleteComment = (commentId: string) =>
    dispatch(deleteCommentOnPost({ postId, commentId, token }));

  const handleCommentChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setCommentData(e.target.value);

  return (
    <Box
      sx={{
        maxWidth: "35rem",
        margin: "0 auto",
        padding: "1.5rem",
        marginBottom: { xs: "3rem", md: "0" },
      }}
    >
      {Object.keys(currPost).length ? (
        <>
          <PostCard post={currPost} />
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              value={commentData}
              onChange={handleCommentChange}
              placeholder="Enter Comment"
              fullWidth
              autoComplete="off"
              size="small"
            />
            <LoadingButton
              disabled={commentData === ""}
              loading={isPosting}
              onClick={handlePostComment}
              disableElevation
              variant="contained"
            >
              Post
            </LoadingButton>
          </Box>
          {currPost.comments.map(({ _id, text, username, name, avatarURL }) => {
            return (
              <Paper
                key={_id}
                variant="outlined"
                sx={{
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  margin: "0.5rem 0",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Stack
                    direction="row"
                    gap={1}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`${LocalRoutes.PROFILE}/${username}`)
                    }
                  >
                    <Avatar
                      sx={{ width: "3rem", height: "3rem" }}
                      src={avatarURL}
                    />
                    <Stack
                      sx={{ width: { xs: "7rem", sm: "12rem" } }}
                      justifyContent="center"
                    >
                      <Typography noWrap>{name}</Typography>
                      <Typography noWrap sx={{ fontSize: "0.7em" }}>
                        @{username}
                      </Typography>
                    </Stack>
                  </Stack>
                  {authUser.username === username && (
                    <IconButton onClick={() => handleDeleteComment(_id)}>
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
                <Typography sx={{ paddingTop: "0.25rem" }}>{text}</Typography>
              </Paper>
            );
          })}
        </>
      ) : (
        <Box sx={{ ...boxStyle }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export { SinglePostPage };
