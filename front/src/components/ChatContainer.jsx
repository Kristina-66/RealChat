import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import {
  Grid,
  ListItemText,
  ListItem,
  List,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const user = localStorage.getItem("userId");
    async function getMessages() {
      const response = await axios.post(recieveMessageRoute, {
        from: user,
        to: currentChat.userId,
      });
      setMessages(response.data);
    }
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        localStorage.getItem("userId");
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const user = localStorage.getItem("userId");
    socket.current.emit("send-msg", {
      to: currentChat.userId,
      from: user,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: user,
      to: currentChat.userId,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  console.log(messages);

  console.log(currentChat);

  return (
    <>
      <List
        sx={{
          height: "70vh",
          overflowY: "auto",
          width: "100%",
          backgroundColor: "#136164",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "0.8rem",
            "&-thumb": {
              backgroundColor: "#fffddbf7",
              width: "2rem",
              borderRadius: "2rem",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "0 2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              p: "0 2rem",
              backgroundColor: "#f3656d",
              borderRadius: "1rem",
            }}
          >
            <PersonIcon fontSize="large" sx={{ color: "#f8f8d7" }} />
            <Typography sx={{ color: "#f8f8d7" }}>
              {currentChat.userName}
            </Typography>
          </Box>
          <Logout />
        </Box>
        {messages.length === 0 && (
          <Typography
            variant="h4"
            sx={{
              color: "#f3656d",
              display: "flex",
              justifyContent: "center",
              mt: "200px",
            }}
          >
            {" "}
            No messages. Create a new message!{" "}
          </Typography>
        )}
        {messages.length > 0 &&
          messages.map((message, index) => {
            return (
              <ListItem key={index}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backgroundColor: "#f8f8d7",
                      maxWidth: "40%",
                      overflowWrap: "break-word",
                      padding: "1rem",
                      fontSize: "1.1rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <ListItemText
                      align={message.fromSelf ? "right" : "left"}
                      primary={message.message.title}
                      sx={{ color: "#136164", cursor: "pointer" }}
                      onClick={handleClick}
                    ></ListItemText>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <ListItemText
                        align={message.fromSelf ? "right" : "left"}
                        primary={message.message.text}
                        sx={{ color: "#f3656d", fontSize: "19px" }}
                      ></ListItemText>
                    </Collapse>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
      </List>
      <ChatInput handleSendMsg={handleSendMsg} />
    </>
  );
}

export default ChatContainer;
