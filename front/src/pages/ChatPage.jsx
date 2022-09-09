import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import {
  Paper,
  Grid,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { host } from "../utils/APIRoutes";
import UserList from "../components/UserList";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";

const useStyles = styled({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});
const Chat = () => {
  const classes = useStyles();
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = useRef();
  const navigate = useNavigate();

  const user = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user);
    }
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: "#000000", height: "100vh" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            className="header-message"
            sx={{
              color: "#2cd6ded4",
              fontWeight: 600,
              fontSize: { md: "2rem" },

              letterSpacing: 1,
            }}
          >
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={userName}></ListItemText>
            </ListItem>
          </List>
          <Divider />

          <Divider />
          <UserList handleChatChange={handleChatChange} />
        </Grid>
        <Grid item xs={9}>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}

          <Divider />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
