import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { userRoute } from "../utils/APIRoutes";

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await axios.post(userRoute, {
      userName,
    });
    localStorage.setItem("userId", user.data.user._id);
    localStorage.setItem("userName", userName);
    if (userName) {
      navigate("/chat");
    }
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: "#f3656d",
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome to Chat!
        </Typography>
        <Box
          component="form"
          maxWidth="27rem"
          width="100%"
          sx={{
            backgroundColor: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            p: { xs: "1rem", sm: "2rem" },
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
            }}
          >
            {" "}
            Type the username you'll use in the chat
          </Typography>
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#f3656d",
              "&:hover": {
                backgroundColor: "#cf2b35",
              },
            }}
            fullWidth
            disableElevation
            type="submit"
            onClick={handleSubmit}
          >
            Log in the chat
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
