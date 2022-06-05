import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Paper, Avatar, Typography, Button } from "@mui/material";
import { followUserMethod, stopLoading } from "../../features";
import { LocalRoutes } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Auth } from "../../types";

const Middlebar = () => {
  const dispatch = useAppDispatch();
  const { users, isUserContentLoading } = useAppSelector(
    (store) => store.users
  );
  const { user: authUser, token } = useAppSelector((store) => store.auth);
  if (token === null) throw new Error("token null");

  const [suggestedUsers, setSuggestedUsers] = useState<Auth.User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestedUsers(
      users.filter(
        (currUser) =>
          !authUser?.following.find(
            (innerCurrUser) => innerCurrUser._id === currUser._id
          ) && currUser.username !== authUser?.username
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
    <>
      {!!suggestedUsers.length ? (
        <Stack
          direction="row"
          spacing={2}
          overflow="auto"
          sx={{
            display: { xs: "flex", md: "none" },
            maxWidth: "35rem",
            margin: "2rem auto",
            padding: "0.5rem",
          }}
        >
          {suggestedUsers.map(
            ({ _id, username, firstName, lastName, avatarURL }) => (
              <Paper
                key={_id}
                elevation={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "10rem",
                  minWidth: "8rem",
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`${LocalRoutes.PROFILE}/${username}`)
                    }
                  >
                    <Avatar
                      sx={{
                        width: "3.5rem",
                        height: "3.5rem",
                        margin: "0 auto",
                      }}
                      src={avatarURL}
                    />
                    <Typography
                      sx={{
                        width: "6.5rem",
                        textAlign: "center",
                      }}
                      noWrap
                    >
                      {firstName} {lastName}
                    </Typography>
                  </Box>

                  <Button
                    onClick={() => handleFollowUser(_id)}
                    disabled={isUserContentLoading}
                    sx={{ textTransform: "none" }}
                    size="small"
                    variant="outlined"
                  >
                    Follow
                  </Button>
                </Stack>
              </Paper>
            )
          )}
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export { Middlebar };
