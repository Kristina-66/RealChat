import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Grid,
  ListItemText,
  ListItem,
  List,
  Typography,
  Collapse,
} from "@mui/material";
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
        to: currentChat,
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
      to: currentChat,
      from: user,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: user,
      to: currentChat,
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

  return (
    <>
      <List
        sx={{
          height: "70vh",
          overflowY: "auto",
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "0.8rem",
            "&-thumb": {
              backgroundColor: "#25b2b9",
              width: "2rem",
              borderRadius: "2rem",
            },
          },
        }}
      >
        <Logout />
        {messages.length === 0 && (
          <Typography
            variant="h4"
            sx={{
              color: "#136164",
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
                      backgroundColor: "#ededed",
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
                      sx={{ color: "#136164" }}
                      onClick={handleClick}
                    ></ListItemText>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <ListItemText
                        align={message.fromSelf ? "right" : "left"}
                        primary={message.message.text}
                        sx={{ color: "gray", fontSize: "19px" }}
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
