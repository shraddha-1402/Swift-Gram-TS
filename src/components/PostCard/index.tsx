import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareIcon from "@mui/icons-material/Share";

import { useLikePosts, useBookmarkPost } from "../../hooks";
import { LocalRoutes, userInitialState } from "../../constants";
import { PostCardPopover } from "../";
import { formatDate } from "../../utils";
import { Auth, Posts } from "../../types";
import { useAppSelector } from "../../app/hooks";

const PostCard = ({ post }: { post: Posts.Post }) => {
  const navigate = useNavigate();
  const { user: authUser, isAuthContentLoading } = useAppSelector(
    (store) => store.auth
  );
  if (authUser === null) throw new Error("authUser is null");
  const { users } = useAppSelector((store) => store.users);
  const { isPostContentLoading } = useAppSelector((store) => store.posts);
  const [currUser, setCurrUser] = useState<Auth.User>(userInitialState);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const { isLiked, handlelikes } = useLikePosts(post);
  const { isBookmarked, handleBookmark } = useBookmarkPost(post);
  const [showOptions, setShowOptions] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.username === post.username);
      if (foundUser) setCurrUser(foundUser);
    }
  }, [users, authUser, post.username]);

  useEffect(() => {
    if (currUser.username === authUser.username) setIsLoggedInUser(true);
    else setIsLoggedInUser(false);
  }, [currUser, authUser]);

  useEffect(() => {
    if (isLoggedInUser && pathname.split("/")[1] === "profile")
      setShowOptions(true);
  }, [pathname, isLoggedInUser]);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "0.25rem",
        maxWidth: "35rem",
        margin: "1rem auto",
        padding: "1rem",
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
          onClick={() => navigate(`${LocalRoutes.PROFILE}/${post.username}`)}
        >
          <Avatar
            sx={{ width: "3rem", height: "3rem" }}
            src={currUser.avatarURL}
          />
          <Stack
            sx={{ width: { xs: "7rem", sm: "12rem" } }}
            justifyContent="center"
          >
            <Typography noWrap>
              {currUser.firstName} {currUser.lastName}
            </Typography>
            <Typography noWrap sx={{ fontSize: "0.7em" }}>
              {formatDate(post.createdAt)}
            </Typography>
          </Stack>
        </Stack>
        {showOptions && <PostCardPopover post={post} />}
      </Stack>
      <Typography sx={{ padding: "1rem 0" }}>{post.content}</Typography>
      {!!post.imageURL && (
        <img
          src={post.imageURL}
          alt="postImage"
          style={{ maxWidth: "100%", margin: "0.5rem 0" }}
        />
      )}
      <Stack direction="row" justifyContent="space-between">
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton disabled={isPostContentLoading} onClick={handlelikes}>
            {isLiked ? (
              <ThumbUpAltIcon sx={{ color: "red" }} />
            ) : (
              <ThumbUpAltOutlinedIcon />
            )}
          </IconButton>
          <Typography>{post.likes.likeCount}</Typography>
        </Box>
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", width: "2.5rem" }}
        >
          <IconButton
            onClick={() => navigate(`${LocalRoutes.SINGLE_POST}/${post._id}`)}
          >
            <ModeCommentOutlinedIcon />
          </IconButton>
          <Typography>{post.comments.length}</Typography>
        </Box>
        <IconButton disabled={isAuthContentLoading} onClick={handleBookmark}>
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export { PostCard };
