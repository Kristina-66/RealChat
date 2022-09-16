import React from "react";
import { useNavigate } from "react-router-dom";

import { Badge, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from "@mui/icons-material/Notifications";

function Notifications() {
  const navigate = useNavigate();
  return (
    <Badge
      badgeContent={0}
      color="secondary"
      onClick={() => navigate(``)}
    >
      <IconButton sx={{ color: "#fffddbf7" }}>
        <EmailIcon />
      </IconButton>
    </Badge>
  );
}

export default Notifications;
