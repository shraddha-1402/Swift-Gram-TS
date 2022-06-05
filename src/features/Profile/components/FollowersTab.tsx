import { useState, useEffect } from "react";
import { Modal, Typography, Box } from "@mui/material";
import { UserSmallProfileCard } from "./UserSmallProfileCard";
import { useAppSelector } from "../../../app/hooks";
import { Auth } from "../../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: 300, sm: 400 },
  transform: "translate(-50%, -50%)",
  borderRadius: "0.25rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const FollowersTab = ({
  textTypo,
  profileUser,
}: {
  textTypo: {};
  profileUser: Auth.User;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [followers, setFollowers] = useState<Auth.User[]>([]);

  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null) throw new Error("authUser is null");
  const { users } = useAppSelector((store) => store.users);

  useEffect(() => {
    setFollowers(
      users.filter((currUser) =>
        profileUser.followers.find(
          (innerCurrUser: Auth.User) => innerCurrUser._id === currUser._id
        )
      )
    );
  }, [users, authUser, profileUser]);

  return (
    <Box>
      <Typography sx={{ ...textTypo, cursor: "pointer" }} onClick={handleOpen}>
        Followers
      </Typography>
      <Modal
        disableScrollLock
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {followers.length ? (
            <>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginBottom: "1rem" }}
              >
                Followers
              </Typography>
              {followers.map((user) => (
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
              No Followers
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export { FollowersTab };
