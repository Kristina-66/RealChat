import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, ChatPage2 } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
