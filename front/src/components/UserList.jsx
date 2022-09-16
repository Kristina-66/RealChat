import React, { useState, useEffect } from "react";

import axios from "axios";
import { ListItemIcon, ListItem, List, Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Notifications from "./Notifications";

function UserList({ handleChatChange }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      const data = await axios.get(
        "https://realchat66.herokuapp.com/api/auth/allusers"
      );
      const users = data.data;
      setUsers(users);
    }
    getAllUsers();
  }, []);

  return (
    <List
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: 400,
        overflow: "auto",
        maxHeight: 600,
        fontSize: "5rem",
        color: "#fffddbf7",
        backgroundColor: "#092c2d",
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
      {users &&
        users.map((user, index) => {
          return (
            <ListItem
              button
              key={user._id}
              onClick={() =>
                handleChatChange({ userId: user._id, userName: user.username })
              }
            >
              <Box
                sx={{
                  backgroundColor: "#f3656d",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  transition: "0.5s ease-in-out",
                  p: "0.4rem",
                  "&:hover": {
                    backgroundColor: "#cf2b35",
                  },
                }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="large" sx={{ color: "#fffddbf7" }} />
                </ListItemIcon>
                <Typography variant="h6"> {user.username}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    
                  }}
                >
                  {" "}
                  <Notifications />
                </Box>
              </Box>
            </ListItem>
          );
        })}
    </List>
  );
}

export default UserList;
