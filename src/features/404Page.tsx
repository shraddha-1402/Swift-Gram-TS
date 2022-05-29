import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { LocalRoutes } from "../constants";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "5rem auto",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography variant="h2">404 Page Not Found</Typography>
      <Typography>
        Oops! The page you are looking for does not exists
      </Typography>
      <Button variant="contained" onClick={() => navigate(LocalRoutes.HOME)}>
        Back To Home
      </Button>
    </Box>
  );
};

export { PageNotFound };
