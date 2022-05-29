import React, { useState, useEffect } from "react";
import { Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutUser } from "../..";
import { EditProfileModal } from "./EditProfileModal";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const UserAction = ({ screenSize }: { screenSize: string }) => {
  const dispatch = useAppDispatch();
  const { userDetails: currUser } = useAppSelector((store) => store.profile);
  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null) throw new Error("authUser null");

  const [isLoggedUserSame, setIsLoggedUserSame] = useState(
    Boolean(currUser.username === authUser.username)
  );

  useEffect(() => {
    setIsLoggedUserSame(Boolean(currUser.username === authUser.username));
  }, [currUser, authUser]);

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
          sx={{ ...btnStyle }}
        >
          Follow
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
