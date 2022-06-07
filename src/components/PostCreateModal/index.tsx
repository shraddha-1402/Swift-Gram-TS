import { useState } from "react";
import { Dialog, ListItem, Button, Box, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import { PostCreateCard } from "../PostCreateCard";

const PostCreateModal = ({ screenSize }: { screenSize: string }) => {
  const handleCloseModal = () => {
    setOpenPostCreateModal(false);
  };

  const handlePostCreateModal = () => {
    setOpenPostCreateModal(true);
  };
  const [openPostCreateModal, setOpenPostCreateModal] = useState(false);

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <>
      {screenSize === "md" ? (
        <ListItem sx={{ margin: "1rem 0" }}>
          <Button
            variant="contained"
            disableElevation
            sx={{ width: "100%", textTransform: "none" }}
            onClick={handlePostCreateModal}
          >
            Create New Post
          </Button>
        </ListItem>
      ) : (
        <>
          <StyledFab
            color="primary"
            size="medium"
            aria-label="add"
            onClick={handlePostCreateModal}
          >
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </>
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
