import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Typography, Box } from "@mui/material";
import { UserSmallProfileCard } from "./UserSmallProfileCard";
import { Auth } from "../../../types";
import { useAppSelector } from "../../../app/hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: 300, sm: 400 },
  maxHeight: "20rem",
  overflowY: "auto",
  transform: "translate(-50%, -50%)",
  borderRadius: "0.25rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const FollowingTab = ({
  textTypo,
  profileUser,
}: {
  textTypo: {};
  profileUser: Auth.User;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [followingUsers, setFollowingUsers] = useState<Auth.User[]>([]);

  const { user: authUser } = useAppSelector((store) => store.auth);
  const { users } = useAppSelector((store) => store.users);

  useEffect(() => {
    setFollowingUsers(
      users.filter((currUser) =>
        profileUser.following.find(
          (innerCurrUser: Auth.User) => innerCurrUser._id === currUser._id
        )
      )
    );
  }, [users, authUser, profileUser]);

  return (
    <Box>
      <Typography sx={{ ...textTypo, cursor: "pointer" }} onClick={handleOpen}>
        Following
      </Typography>
      <Modal
        disableScrollLock
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {followingUsers.length ? (
            <>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginBottom: "1rem" }}
              >
                Following Users
              </Typography>
              {followingUsers.map((user) => (
                <UserSmallProfileCard
                  key={user._id}
                  user={user}
                  setOpen={setOpen}
                />
              ))}
            </>
          ) : (
            <Typography
              sx={{ textAlign: "center" }}
              variant="h6"
              component="h2"
            >
              No Following
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export { FollowingTab };
