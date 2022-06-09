import { useState, useEffect } from "react";
import {
  Box,
  ListItem,
  ListItemButton,
  Typography,
  ListItemIcon,
  ListItemText,
  Modal,
  InputBase,
  IconButton,
  Paper,
} from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import { UserSmallProfileCard } from "../../features/Profile/components/UserSmallProfileCard";
import { useAppSelector } from "../../app/hooks";
import { Auth } from "../../types";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "background.default",
  border: "1px solid black",
  width: 350,
  height: 450,
  p: 2,
};

const SearchModal = () => {
  const { users } = useAppSelector((store) => store.users);
  const [searchString, setSearchString] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<Auth.User[]>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchedUsers([]);
  };

  const handleSearch = () => {
    setSearchedUsers(
      users.filter(
        (user) =>
          searchString !== "" &&
          (user.username.toLowerCase().includes(searchString.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchString.toLowerCase()))
      )
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchString]);

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search Users" />
        </ListItemButton>
      </ListItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Users"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Paper>
          <Box
            sx={{
              maxHeight: `calc(100% - 5rem)`,
              overflowY: "auto",
              padding: "0 0.5rem 0.5rem 0",
            }}
          >
            {searchedUsers.map((searchedUser) => (
              <UserSmallProfileCard
                key={searchedUser._id}
                user={searchedUser}
                setOpen={setOpen}
              />
            ))}
            <Typography textAlign="center" color="gray">
              {searchString && searchedUsers.length === 0 && "No users found"}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export { SearchModal };
