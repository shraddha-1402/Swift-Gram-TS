import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { signOutUser } from "../../../features/";
import { useAppDispatch } from "../../../app/hooks";
import { ThemeChangeSwitch } from "./ThemeChangeSwitch";

const SettingsModal = () => {
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpenSettingModal(true);
  const handleClose = () => setOpenSettingModal(false);

  return (
    <>
      <IconButton sx={{ marginLeft: "1rem" }} onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={openSettingModal} onClose={handleClose}>
        <Box sx={{ maxWidth: "35rem", padding: "1rem", textAlign: "center" }}>
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
            <ThemeChangeSwitch />
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
