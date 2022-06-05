import React, { useState } from "react";

import { Box, TextField, Stack, Avatar, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { publishSinglePost, editSinglePost } from "../../features";
import { EmojiPopover } from "../Popover";
import { Posts } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const PostCreateCard = ({
  post,
  closeBackdrop,
}: {
  post?: Posts.Post;
  closeBackdrop?: () => void;
}) => {
  const [postContent, setPostContent] = useState(
    post === undefined ? "" : post.content
  );
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (token === null || authUser === null)
    throw new Error("token or authUser null");
  const { isPostContentLoading } = useAppSelector((store) => store.posts);
  const dispatch = useAppDispatch();

  const handleBackdropClose = () => {
    if (!isPostContentLoading) {
      setPostContent("");
      closeBackdrop && closeBackdrop();
    }
  };

  const handleEditPost = () => {
    if (post)
      dispatch(
        editSinglePost({
          postId: post._id,
          postData: { content: postContent },
          token,
        })
      );
    handleBackdropClose();
  };

  const handlePublishPost = () => {
    dispatch(publishSinglePost({ postContent, token }));
    handleBackdropClose();
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "0.25rem",
        maxWidth: "35rem",
        margin: "0rem auto",
        padding: "1rem",
      }}
    >
      <Stack direction="row" gap={2}>
        <Avatar
          sx={{ width: "3rem", height: "3rem" }}
          src={authUser?.avatarURL}
        />
        <Box sx={{ width: "100%" }}>
          <Box component="form">
            <TextField
              id="outlined-multiline-static"
              multiline
              maxRows={4}
              minRows={4}
              fullWidth
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </Box>
          <Stack direction="row-reverse">
            <EmojiPopover setPostContent={setPostContent} />
          </Stack>
        </Box>
      </Stack>
      <LoadingButton
        disabled={postContent === ""}
        disableElevation
        size="small"
        variant="contained"
        fullWidth
        loading={isPostContentLoading}
        onClick={post ? handleEditPost : handlePublishPost}
      >
        {post ? "Edit" : "Post"}
      </LoadingButton>
    </Paper>
  );
};

export { PostCreateCard };
