import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Menu from "./Menu.jsx";
import App from "./App.jsx";
import Ai from "./Ai.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/app" element={<App />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
