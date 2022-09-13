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
        backgroundColor: "#f3656d",
        color: "white",
        border: "none",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#cf2b35",
        },
      }}
    >
      {" "}
      <HighlightOffIcon />{" "}
    </IconButton>
  );
}

export default Welcome;
