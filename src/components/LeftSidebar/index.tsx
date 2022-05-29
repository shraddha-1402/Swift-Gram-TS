import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { LocalRoutes } from "../../constants";
const drawerWidth = 200;

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currPath, setCurrPath] = useState("");
  useEffect(() => {
    setCurrPath(pathname.split("/")[1]);
  }, [pathname]);

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
      anchor="left"
    >
      <Toolbar />
      <List
        sx={{
          paddingTop: "1rem",
        }}
      >
        <ListItem disablePadding selected={currPath === "home"}>
          <ListItemButton onClick={() => navigate(LocalRoutes.HOME)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding selected={currPath === "explore"}>
          <ListItemButton onClick={() => navigate(LocalRoutes.EXPLORE)}>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding selected={currPath === "bookmarks"}>
          <ListItemButton onClick={() => navigate(LocalRoutes.BOOKMARKS)}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItemButton>
        </ListItem>

        {currPath === "home" ? null : (
          <ListItem sx={{ margin: "1rem 0" }}>
            <Button
              variant="contained"
              disableElevation
              sx={{ width: "100%" }}
              onClick={() => navigate(LocalRoutes.HOME)}
            >
              Post
            </Button>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export { LeftSidebar };
