import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import {
  Route,
  BrowserRouter as Router,
  Routes as RoutesContainer,
} from "react-router-dom";

import App from "./App";
import { PrivateRoute } from "./components";
import {
  HomePage,
  ProfilePage,
  Bookmark,
  Explore,
  Signin,
  Signup,
  SinglePostPage,
  PageNotFound,
} from "./features";
import { useAppSelector } from "./app/hooks";
import { LocalRoutes } from "./constants";

const Routes = () => {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: { main: "#E94826" },
      ...(mode === "dark"
        ? {
            background: {
              default: "#1E1F21",
              paper: "#2A2B2D",
            },
          }
        : {
            background: {
              default: "#F7FAFC",
              paper: "#fcfcfc",
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <RoutesContainer>
          <Route element={<PrivateRoute />}>
            <Route element={<App />}>
              <Route path={LocalRoutes.HOME} element={<HomePage />} />
              <Route
                path={`${LocalRoutes.PROFILE}/:username`}
                element={<ProfilePage />}
              />
              <Route path={LocalRoutes.BOOKMARKS} element={<Bookmark />} />
              <Route
                path={`${LocalRoutes.SINGLE_POST}/:postId`}
                element={<SinglePostPage />}
              />
              <Route path={LocalRoutes.EXPLORE} element={<Explore />} />s
            </Route>
          </Route>
          <Route element={<PrivateRoute authRoute={true} />}>
            <Route path={LocalRoutes.SIGNIN} element={<Signin />} />
            <Route path={LocalRoutes.SIGNUP} element={<Signup />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </RoutesContainer>
      </Router>
    </ThemeProvider>
  );
};

export { Routes };
