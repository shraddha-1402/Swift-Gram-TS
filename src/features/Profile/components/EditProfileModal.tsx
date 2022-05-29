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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { editUserProfile } from "../..";
import { getAllUsers } from "../../PostPages/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

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

function EditProfileModal({ btnStyle }: { btnStyle: { width: string } }) {
  const dispatch = useAppDispatch();
  const { user: authUser, token, isAuthContentLoading } = useAppSelector(
    (store) => store.auth
  );
  if (authUser === null || token === null)
    throw new Error("authUser or token is null");
  const [avatarURL, setAvatarUrl] = useState(authUser.avatarURL);
  const [bio, setBio] = useState(authUser.bio);
  const [website, setWebsite] = useState(authUser.website);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const uploadImage = async (files: FileList) => {
    const image = files[0];
    if (Math.round(image.size / 1024000) > 2)
      console.log("File size should be less than 2MB");
    //add toast
    else {
      const data = new FormData();
      data.append("file", image);
      if (process.env.REACT_APP_CLOUDINARY_API_KEY)
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_API_KEY);
      const requestOptions = {
        method: "POST",
        body: data,
      };
      await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setAvatarUrl(json.secure_url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editUserProfile({ userData: { bio, website, avatarURL }, token }));
    dispatch(getAllUsers());
    if (!isAuthContentLoading) handleClose();
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
              <input
                accept="image/*"
                style={inputStyle}
                id="icon-button-file"
                type="file"
                onChange={(e) => {
                  if (e.target.files) uploadImage(e.target.files);
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
