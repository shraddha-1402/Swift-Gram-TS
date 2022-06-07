import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, Typography, Avatar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import { LocalRoutes } from "../../constants";
import { useAppSelector } from "../../app/hooks";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user: authUser } = useAppSelector((store) => store.auth);
  if (authUser === null) throw new Error("authUser null");

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
    >
      <Link
        to={LocalRoutes.HOME}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          variant="h4"
          component="h1"
          noWrap
        >
          Swift Gram
        </Typography>
      </Link>
      <IconButton
        sx={{ display: { xs: "none", md: "block" } }}
        onClick={() => {
          console.log(`${LocalRoutes.PROFILE}/${authUser.username}`);
          navigate(`${LocalRoutes.PROFILE}/${authUser.username}`);
        }}
      >
        <Avatar src={authUser.avatarURL} />
      </IconButton>
    </MuiAppBar>
  );
};

export { Navbar };
