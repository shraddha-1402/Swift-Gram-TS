import React, { MouseEvent, useState } from "react";

import {
  Box,
  TextField,
  Stack,
  Avatar,
  Paper,
  IconButton,
  CircularProgress,
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
  top: "0.25rem",
  left: "0.25rem",
  backgroundColor: "#393A3C",
  "&:hover": {
    backgroundColor: "#1E1F21",
  },
};

const PostCreateCard = ({
  post,
  closeBackdrop,
}: {
  post?: Posts.Post;
  closeBackdrop?: () => void;
}) => {
  const [{ postContent, postImageURL }, setPostData] = useState<{
    postContent: string;
    postImageURL: string;
  }>(
    post === undefined
      ? { postContent: "", postImageURL: "" }
      : { postContent: post.content, postImageURL: post.imageURL }
  );
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (token === null || authUser === null)
    throw new Error("token or authUser null");
  const { isPostContentLoading } = useAppSelector((store) => store.posts);
  const dispatch = useAppDispatch();

  const handleBackdropClose = () => {
    if (!isPostContentLoading) {
      setPostData({ postContent: "", postImageURL: "" });
      closeBackdrop && closeBackdrop();
    }
  };

  const handleEditPost = () => {
    if (post)
      dispatch(
        editSinglePost({
          postId: post._id,
          postData: { content: postContent, imageURL: postImageURL },
          token,
        })
      );
    handleBackdropClose();
  };

  const handlePublishPost = () => {
    dispatch(publishSinglePost({ postContent, postImageURL, token }));
    handleBackdropClose();
  };

  const handleRemovePostImage = () =>
    setPostData((prev) => ({ ...prev, postImageURL: "" }));

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
              onChange={(e) =>
                setPostData((prev) => ({
                  ...prev,
                  postContent: e.target.value,
                }))
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageUploadLoading && (
              <CircularProgress
                size="2rem"
                sx={{
                  marginTop: "1rem",
                }}
              />
            )}
          </Box>
          {!!postImageURL && (
            <Box
              sx={{
                borderRadius: "0.25rem",
                position: "relative",
                maxWidth: "100%",
                marginTop: "0.5rem",
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
                src={postImageURL}
                style={{ maxWidth: "100%", borderRadius: "inherit" }}
                alt="postImage"
              />
            </Box>
          )}
          <Stack
            direction="row-reverse"
            alignItems="center"
            margin="0.25rem 0 0.5rem"
          >
            <EmojiPopover setPostData={setPostData} />
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
                      setImageURL: {
                        type: "PostDataFunction",
                        func: setPostData,
                      },
                      setLoading: setImageUploadLoading,
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
        disabled={postContent === "" && postImageURL === ""}
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
