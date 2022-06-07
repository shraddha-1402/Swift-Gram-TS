import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { signOutUser, toggleDarkMode } from "../../../features/";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const SettingsModal = () => {
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const { mode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpenSettingModal(true);
  const handleClose = () => setOpenSettingModal(false);
  const handleThemeToggle = () => dispatch(toggleDarkMode());

  return (
    <>
      <IconButton sx={{ marginLeft: "1rem" }} onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={openSettingModal} onClose={handleClose}>
        <Box sx={{ width: "16rem", padding: "1rem", textAlign: "center" }}>
          <Typography sx={{ fontSize: "1.4em", margin: "0.5rem 0 1rem" }}>
            Settings
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="1.5rem"
          >
            <Typography>Change Theme: </Typography>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleThemeToggle}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>
          <Button
            sx={{ textTransform: "none", margin: "0.5rem 0" }}
            variant="contained"
            disableElevation
            color="error"
            endIcon={<LogoutIcon />}
            onClick={() => dispatch(signOutUser())}
          >
            Logout
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export { SettingsModal };
