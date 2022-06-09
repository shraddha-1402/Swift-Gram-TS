import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LocalRoutes, testLoginCredentials } from "../../constants";
import { HeroSection } from "./components/HeroSection";
import { signInUser } from "./authSlice";
import { useDynamicTitle } from "../../hooks";

const Signin = () => {
  useDynamicTitle();
  const dispatch = useAppDispatch();
  const { isAuthLoading } = useAppSelector((state) => state.auth);
  const [signinFieldValues, setSigninFieldValues] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const setFormFieldValues = (e: ChangeEvent<HTMLFormElement>) => {
    setSigninFieldValues({
      ...signinFieldValues,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInUser(signinFieldValues));
  };

  const handleTestSignin = () => {
    dispatch(signInUser(testLoginCredentials));
  };

  return (
    <Stack>
      <HeroSection />
      <Box
        id="form-section"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            maxWidth: "30rem",
            height: "fit-content",
            padding: "3rem 2rem",
            margin: "0 1rem",
          }}
        >
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={handleSubmit}
            onChange={setFormFieldValues}
            autoComplete="off"
          >
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={signinFieldValues.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={signinFieldValues.password}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                loading={isAuthLoading}
              >
                Sign In
              </LoadingButton>
              <LoadingButton
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                loading={isAuthLoading}
                onClick={handleTestSignin}
              >
                Sign In With Test Credentials
              </LoadingButton>
              <Link to={LocalRoutes.SIGNUP} style={{ color: "inherit" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
};

export { Signin };
