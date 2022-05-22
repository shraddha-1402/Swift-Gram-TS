import { createTheme, ThemeProvider } from "@mui/material";
import {
  Route,
  BrowserRouter as Router,
  Routes as RoutesContainer,
} from "react-router-dom";

import App from "./App";
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
    <Router>
      <RoutesContainer>
        <Route
          path={LocalRoutes.HOME}
          element={
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          }
        />
      </RoutesContainer>
    </Router>
  );
};

export { Routes };
