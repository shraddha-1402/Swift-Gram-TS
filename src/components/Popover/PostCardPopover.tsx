import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Popover,
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
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton>
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
        <IconButton
          sx={{
            position: "absolute",
            right: "0rem",
            top: "0rem",
          }}
        >
          <CloseIcon sx={{ width: "1.1rem", height: "1.1rem" }} />
        </IconButton>
        <List>
          <PostCardModal post={post} />
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
