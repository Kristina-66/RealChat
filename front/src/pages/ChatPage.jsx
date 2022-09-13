import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import {
  Grid,
  ListItemIcon,
  ListItem,
  List,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { host } from "../utils/APIRoutes";
import UserList from "../components/UserList";
import ChatContainer from "../components/ChatContainer";
import Welcome from "../components/Welcome";

const Chat = () => {
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
              color: "#fffddbf7",
              fontWeight: 600,
              fontSize: { md: "2rem" },
              letterSpacing: 1,
            }}
          >
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ backgroundColor: "#092c2d" }}>
        <Grid item xs={3}>
          <List sx={{ backgroundColor: "#092c2d" }}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon
                  fontSize="large"
                  sx={{ color: "#fffddbf7" }}
                />
              </ListItemIcon>
              <Typography variant="h6" sx={{ color: "#fffddbf7" }}>
                {" "}
                {userName}
              </Typography>
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
