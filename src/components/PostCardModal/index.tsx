import { useState } from "react";
import { Dialog, ListItem, ListItemButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { PostCreateCard } from "../PostCreateCard";
import { Posts } from "../../types";

const iconStyle = {
  width: "1rem",
  height: "1rem",
  marginRight: "0.5rem",
};

const PostCardModal = ({
  post,
  handleClose,
}: {
  post: Posts.Post;
  handleClose: () => void;
}) => {
  const handleCloseModal = () => {
    setOpenEditPostModal(false);
    handleClose();
  };

  const handleEditPostModal = () => {
    setOpenEditPostModal(true);
  };
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ padding: "0.25rem 0.5rem", borderRadius: "0.25rem" }}
          onClick={handleEditPostModal}
        >
          <ModeEditIcon sx={{ ...iconStyle }} />
          Edit
        </ListItemButton>
      </ListItem>
      <Dialog
        disableScrollLock
        open={openEditPostModal}
        onClose={handleCloseModal}
      >
        <PostCreateCard post={post} closeBackdrop={handleCloseModal} />
      </Dialog>
    </>
  );
};

export { PostCardModal };
