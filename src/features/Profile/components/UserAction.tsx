import React, { useState, useEffect } from "react";
import { Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutUser, unfollowUser, followUserMethod } from "../..";
import { EditProfileModal } from "./EditProfileModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Auth } from "../../../types";

const UserAction = ({
  screenSize,
  user,
}: {
  screenSize: string;
  user: Auth.User;
}) => {
  const dispatch = useAppDispatch();
  const { userDetails: currUser } = useAppSelector((store) => store.profile);
  const { users, isUserContentLoading } = useAppSelector(
    (store) => store.users
  );
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (authUser === null || token === null)
    throw new Error("authUser or token null");
  const [isFollowing, setIsFollowing] = useState(false);

  const [isLoggedUserSame, setIsLoggedUserSame] = useState(
    Boolean(currUser.username === authUser.username)
  );

  useEffect(() => {
    setIsLoggedUserSame(Boolean(currUser.username === authUser.username));
  }, [currUser, authUser]);

  useEffect(() => {
    setIsFollowing(
      Boolean(authUser.following.find(({ _id }) => _id === user._id))
    );
  }, [users, authUser, user]);

  const handleFollowUnfollowCLick = () => {
    if (isFollowing)
      dispatch(unfollowUser({ followUserId: user._id, token, dispatch }));
    else
      dispatch(followUserMethod({ followUserId: user._id, token, dispatch }));
  };

  const boxStyle =
    screenSize === "xs"
      ? {
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          marginTop: "1rem",
        }
      : { display: { xs: "none", sm: "block" } };

  const btnStyle =
    screenSize === "xs"
      ? {
          width: "100%",
        }
      : { width: "fit-content" };

  return (
    <Box sx={{ ...boxStyle }}>
      {isLoggedUserSame ? (
        <EditProfileModal btnStyle={btnStyle} />
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          sx={{ ...btnStyle, textTransform: "none" }}
          onClick={handleFollowUnfollowCLick}
          disabled={isUserContentLoading}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
      {isLoggedUserSame && (
        <IconButton
          sx={{ marginLeft: "1rem" }}
          onClick={() => dispatch(signOutUser())}
        >
          <LogoutIcon />
        </IconButton>
      )}
    </Box>
  );
};

export { UserAction };
