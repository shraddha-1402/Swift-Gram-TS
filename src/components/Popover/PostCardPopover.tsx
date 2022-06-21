import { useState, MouseEvent } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Popover,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { PostCardModal } from "../PostCardModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteSinglePost } from "../../features";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Posts } from "../../types";

const iconStyle = {
  width: "1rem",
  height: "1rem",
  marginRight: "0.5rem",
};

const PostCardPopover = ({ post }: { post: Posts.Post }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((store) => store.auth);
  if (token === null) throw new Error("token null");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePostDelete = () => {
    dispatch(deleteSinglePost({ postId: post._id, token }));
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        disableScrollLock
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack direction="row-reverse" padding="0.25rem 0.25rem 0 0">
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon sx={{ width: "1rem", height: "1rem" }} />
          </IconButton>
        </Stack>
        <List disablePadding sx={{ padding: "0 0.5rem 0.5rem" }}>
          <PostCardModal handleClose={handleClose} post={post} />
          <ListItem disablePadding>
            <ListItemButton
              sx={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
              onClick={handlePostDelete}
            >
              <DeleteIcon sx={{ ...iconStyle }} />
              Delete
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export { PostCardPopover };
