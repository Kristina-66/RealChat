import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import { logoutRoute } from "../utils/APIRoutes";

function Welcome() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = localStorage.getItem("userId");
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        padding: "0.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "#25b2b9",
        color: "white",
        border: "none",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#176d72",
        },
      }}
    >
      {" "}
      <HighlightOffIcon />{" "}
    </IconButton>
  );
}

export default Welcome;
