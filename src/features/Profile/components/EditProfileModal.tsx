import { CSSProperties, FormEvent, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Button,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { editUserProfile } from "../..";
import { getAllUsers } from "../../PostPages/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { uploadImage } from "../../../utils";

const avatarStyle: CSSProperties = {
  width: "5rem",
  height: "5rem",
  margin: "0 auto",
};

const iconStyle: CSSProperties = {
  position: "absolute",
  bottom: "0.5rem",
  left: "50%",
};

const inputStyle: CSSProperties = {
  width: "0",
  height: "0",
  visibility: "hidden",
};

const loadingContainerStyle: CSSProperties = {
  position: "absolute",
  top: "-0.5rem",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function EditProfileModal({ btnStyle }: { btnStyle: { width: string } }) {
  const dispatch = useAppDispatch();
  const { user: authUser, token, isAuthContentLoading } = useAppSelector(
    (store) => store.auth
  );
  if (authUser === null || token === null)
    throw new Error("authUser or token is null");
  const [avatarURL, setAvatarUrl] = useState<string>(authUser.avatarURL);
  const [bio, setBio] = useState<string>(authUser.bio);
  const [website, setWebsite] = useState<string>(authUser.website);
  const [open, setOpen] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editUserProfile({
        userData: { bio, website, avatarURL },
        token,
      })
    );
    dispatch(getAllUsers());
    if (!isAuthContentLoading) handleClose();
  };

  const handleCancelUpdate = () => {
    setAvatarUrl(authUser.avatarURL);
    setBio(authUser.bio);
    setWebsite(authUser.website);
  };

  const handleClose = () => {
    setOpen(false);
    handleCancelUpdate();
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        sx={{ ...btnStyle }}
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </Button>
      <Dialog disableScrollLock open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ position: "relative" }}>
              <Avatar sx={{ ...avatarStyle }} src={avatarURL} />
              <Box sx={{ ...loadingContainerStyle }}>
                {imageUploadLoading && <CircularProgress size="1.5rem" />}
              </Box>
              <input
                accept="image/*"
                style={inputStyle}
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  if (e.target.files)
                    uploadImage({
                      files: e.target.files,
                      setImageURL: {
                        type: "AvatarURLFunction",
                        func: setAvatarUrl,
                      },
                      setLoading: setImageUploadLoading,
                    });
                }}
              />
              <label htmlFor="icon-button-file" style={{ ...iconStyle }}>
                <IconButton component="span">
                  <CameraAltIcon />
                </IconButton>
              </label>
            </Box>

            <TextField
              size="small"
              multiline
              maxRows={2}
              minRows={2}
              fullWidth
              id="outlined-basic"
              label="Bio"
              variant="outlined"
              sx={{ marginBottom: "1rem" }}
              defaultValue={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              size="small"
              id="outlined-basic"
              fullWidth
              label="Website url"
              variant="outlined"
              defaultValue={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              variant="contained"
              loading={isAuthContentLoading}
              type="submit"
            >
              Update
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export { EditProfileModal };
