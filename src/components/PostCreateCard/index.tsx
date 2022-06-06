import React, { MouseEvent, useState } from "react";

import {
  Box,
  TextField,
  Stack,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { publishSinglePost, editSinglePost } from "../../features";
import { EmojiPopover } from "../Popover";
import { Posts } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { uploadImage } from "../../utils";

const cancelBtnStyle = {
  position: "absolute",
};

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
  const [postImageData, setPostImageData] = useState<string>("");
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

  const handleRemovePostImage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    console.log(postImageData);
    setPostImageData("");
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
              minRows={1}
              fullWidth
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </Box>
          {!!postImageData && (
            <Box
              sx={{
                borderRadius: "0.25rem",
                position: "relative",
                maxWidth: "100%",
                margin: "1rem 0",
              }}
            >
              <IconButton
                size="small"
                sx={cancelBtnStyle}
                onClick={handleRemovePostImage}
              >
                <CloseOutlinedIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
              <img
                src={postImageData}
                style={{ maxWidth: "100%", borderRadius: "inherit" }}
              />
            </Box>
          )}
          <Stack
            direction="row-reverse"
            alignItems="center"
            margin="0.25rem 0 0.5rem"
          >
            <EmojiPopover setPostContent={setPostContent} />
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  if (e.target.files)
                    uploadImage({
                      files: e.target.files,
                      setURL: setPostImageData,
                    });
                }}
              />
              <IconButton component="span">
                <InsertPhotoIcon />
              </IconButton>
            </label>
          </Stack>
        </Box>
      </Stack>
      <LoadingButton
        disabled={postContent === "" && postImageData === ""}
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
