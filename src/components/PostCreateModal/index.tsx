import { useState } from "react";
import {
  Dialog,
  ListItem,
  Button,
  BottomNavigationAction,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { PostCreateCard } from "../PostCreateCard";

const PostCreateModal = ({ screenSize }: { screenSize: string }) => {
  const handleCloseModal = () => {
    setOpenPostCreateModal(false);
  };

  const handlePostCreateModal = () => {
    setOpenPostCreateModal(true);
  };
  const [openPostCreateModal, setOpenPostCreateModal] = useState(false);

  return (
    <>
      {screenSize === "md" ? (
        <ListItem sx={{ margin: "1rem 0" }}>
          <Button
            variant="contained"
            disableElevation
            sx={{ width: "100%" }}
            onClick={handlePostCreateModal}
          >
            Post
          </Button>
        </ListItem>
      ) : (
        <BottomNavigationAction
          icon={<AddCircleIcon />}
          onClick={handlePostCreateModal}
        />
      )}
      <Dialog
        disableScrollLock
        open={openPostCreateModal}
        onClose={handleCloseModal}
      >
        <PostCreateCard closeBackdrop={handleCloseModal} />
      </Dialog>
    </>
  );
};

export { PostCreateModal };
