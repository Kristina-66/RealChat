import React from "react";

import { Container, Typography, Box } from "@mui/material";
import Cat from "../assets/cat.gif";

function Welcome() {
  const userName = localStorage.getItem("userName");

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#136164",
          mt: 2,
        }}
      >
        <img src={Cat} alt="" />
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: "#136164",
        }}
      >
        Welcome, {userName}!
      </Typography>
      <Typography
        sx={{
          color: "#136164",
        }}
        variant="h6"
      >
        {" "}
        Please select a chat to Start messaging.
      </Typography>
    </Container>
  );
}

export default Welcome;
