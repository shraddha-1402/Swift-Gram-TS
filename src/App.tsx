import React from "react";
import "./App.css";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { useAppDispatch } from "./app/hooks";
import { toggleDarkMode } from "./features";

function App() {
  const dispatch = useAppDispatch();

  return (
    <Paper sx={{ width: "50vw", height: "50vh" }}>
      <Button onClick={() => dispatch(toggleDarkMode())} variant="contained">
        Toggle Theme
      </Button>
    </Paper>
  );
}

export default App;
