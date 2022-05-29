import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import { LocalRoutes } from "../../constants";
import { useAppSelector } from "../../app/hooks";

const Bottombar = () => {
  const { user: authUser } = useAppSelector((store) => store.auth);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname.split("/")[1]) {
      case "explore":
        setValue(0);
        break;
      case "home":
        setValue(2);
        break;
      case "bookmarks":
        setValue(3);
        break;
      case "profile":
        setValue(4);
        break;
      default:
        setValue(-1);
    }
  }, [pathname]);

  return (
    <Paper
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction
          icon={<ExploreIcon />}
          onClick={() => navigate(LocalRoutes.EXPLORE)}
        />
        <BottomNavigationAction
          icon={<AddCircleIcon />}
          onClick={() => navigate(LocalRoutes.HOME)}
        />
        <BottomNavigationAction
          icon={<HomeIcon />}
          onClick={() => navigate(LocalRoutes.HOME)}
        />
        <BottomNavigationAction
          icon={<BookmarkIcon />}
          onClick={() => navigate(LocalRoutes.BOOKMARKS)}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          onClick={() =>
            navigate(`${LocalRoutes.PROFILE}/${authUser?.username}`)
          }
        />
      </BottomNavigation>
    </Paper>
  );
};

export { Bottombar };
