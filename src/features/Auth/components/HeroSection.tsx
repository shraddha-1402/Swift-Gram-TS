import React from "react";
import { Stack, Box, Typography, Fab, useTheme } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import heroImg from "../../../assets/heroImg.svg";
import "./style.css";

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      component="main"
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Stack sx={{ margin: "0 auto", width: "fit-content" }}>
          <Typography variant="h2" component="h2">
            Like
          </Typography>
          <Typography variant="h2" component="h2">
            Follow
          </Typography>
          <Typography variant="h2" component="h2">
            Socialize
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            variant="h2"
            component="h2"
          >
            Swift Gram.
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ width: "50%", display: { xs: "none", md: "block" } }}>
        <Box sx={{ width: "90%", margin: "0 auto" }}>
          <img src={heroImg} alt="heroImg" />
        </Box>
      </Box>
      <a href="#form-section" className="scroll-down-link">
        <Fab color="primary">
          <KeyboardDoubleArrowDownIcon />
        </Fab>
      </a>
    </Stack>
  );
};

export { HeroSection };
