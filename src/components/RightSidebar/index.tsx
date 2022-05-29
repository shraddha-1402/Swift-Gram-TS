import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  Box,
  Divider,
  Toolbar,
  Button,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";

import { followUserMethod, stopLoading } from "../../features";
import { LocalRoutes } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Auth } from "../../types";

const drawerWidth = 280;

const RightSidebar = () => {
  const dispatch = useAppDispatch();
  const { users, isUserContentLoading } = useAppSelector(
    (store) => store.users
  );
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (authUser === null || token === null)
    throw new Error("authUser or token is null");

  const [suggestedUsers, setSuggestedUsers] = useState<Auth.User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestedUsers(
      users.filter(
        (currUser) =>
          !authUser.following.find(
            (innerCurrUser) => innerCurrUser._id === currUser._id
          ) && currUser.username !== authUser.username
      )
    );
  }, [users, authUser]);

  useEffect(() => {
    (async () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(0);
        }, 500);
      });
      await promise.then(() => dispatch(stopLoading()));
    })();
  }, [suggestedUsers]);

  const handleFollowUser = (followUserId: string) => {
    dispatch(followUserMethod({ followUserId, token, dispatch }));
  };

  return (
    <Drawer
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <Typography sx={{ padding: "1.5rem 1rem 0.5rem", fontSize: "1.2em" }}>
        Suggestions for you
      </Typography>
      <List>
        {suggestedUsers.map(
          ({ _id, username, firstName, lastName, avatarURL }) => {
            return (
              <Box key={_id}>
                <Divider sx={{ margin: "0.25rem 0.5rem" }} />
                <ListItem>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                  >
                    <Stack
                      direction="row"
                      gap="0.5rem"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`${LocalRoutes.PROFILE}/${username}`)
                      }
                    >
                      <Avatar src={avatarURL} />
                      <Stack sx={{ width: "8rem" }} justifyContent="center">
                        <Typography
                          noWrap
                          sx={{
                            margin: "0",
                          }}
                        >
                          {firstName} {lastName}
                        </Typography>
                        <Typography noWrap sx={{ fontSize: "0.8em" }}>
                          @{username}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Button
                      disabled={isUserContentLoading}
                      sx={{ textTransform: "none" }}
                      size="small"
                      variant="outlined"
                      onClick={() => handleFollowUser(_id)}
                    >
                      Follow
                    </Button>
                  </Stack>
                </ListItem>
              </Box>
            );
          }
        )}
      </List>
    </Drawer>
  );
};

export { RightSidebar };
