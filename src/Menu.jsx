import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css"; // ใช้ไฟล์ CSS ใหม่

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <div className="menu-card shadow-lg">
        <h1 className="menu-title">❌ เกม X O ⭕</h1>
        <p className="menu-subtitle">เลือกโหมดการเล่นของคุณ</p>
        <div className="menu-buttons">
          <button
            className="btn btn-success btn-lg w-100 mb-3"
            onClick={() => navigate("/app")}
          >
            🎮 เล่นกับผู้เล่น
          </button>
          <button
            className="btn btn-danger btn-lg w-100"
            onClick={() => navigate("/ai")}
          >
            🤖 เล่นกับ AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
