import React from "react";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton, Typography, Avatar, Stack } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import { LocalRoutes } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleDarkMode } from "../../features/";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((store) => store.auth);

  const handleThemeToggle = () => dispatch(toggleDarkMode());

  return (
    <MuiAppBar
      position="fixed"
      variant="outlined"
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 1rem",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
      onClick={() => navigate(LocalRoutes.HOME)}
    >
      <Typography
        sx={{ cursor: "pointer", fontWeight: "bold" }}
        variant="h4"
        component="h1"
        noWrap
      >
        Swift Gram
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleThemeToggle}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Avatar
          src={authUser?.avatarURL}
          sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }}
          onClick={() =>
            navigate(`${LocalRoutes.PROFILE}/${authUser?.username}`)
          }
        />
      </Stack>
    </MuiAppBar>
  );
};

export { Navbar };
