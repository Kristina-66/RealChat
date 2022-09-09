import React, { useState, useEffect } from "react";

import axios from "axios";
import { ListItemText, ListItemIcon, ListItem, List } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function UserList({ handleChatChange }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      const data = await axios.get("https://realchat66.herokuapp.com/api/auth/allusers");
      const users = data.data;
      setUsers(users);
    }
    getAllUsers();
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        position: "relative",
        overflow: "auto",
        maxHeight: 600,
        fontSize: "5rem",
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
      {users &&
        users.map((user, index) => {
          return (
            <ListItem
              button
              key={user._id}
              onClick={() => handleChatChange(user._id)}
            >
              <ListItemIcon>
                <PersonIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>
          );
        })}
    </List>
  );
}

export default UserList;
