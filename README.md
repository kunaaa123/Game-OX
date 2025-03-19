https://github.com/kunaaa123/Game-OX

XO Game (Custom Size)

📌 Project Overview
เกม XO ที่ผู้เล่นสามารถปรับขนาดกระดานได้ตามต้องการ พร้อมระบบ AI สำหรับการเล่นกับคอมพิวเตอร์

🚀 Features
ปรับขนาดกระดาน (3x3, 4x4, NxN)
ระบบเก็บประวัติการเล่นและผู้ชนะ
เลือกสัญลักษณ์ผู้เล่น (X, O)
AI Bot คู่แข่ง
เลือกระดับความยากของ AI (ง่าย, กลาง, ยาก)

⚙️ Tech Stack
Frontend: React, JavaScript, Bootstrap

🔧 Installation

Clone Repository

git clone https://github.com/kunaaa123/Game-OX

cd ox-game

Install Dependencies

npm install

Run Application

npm run dev

algorithm

Minimax Algorithm

1. Components
   React Components: ใช้ React สำหรับ UI และจัดการ State
   State Management: ใช้ React Hooks (useState, useEffect)
2. Game Logic
   AI Logic (minimax): AI เลือกตาที่ดีที่สุดตามระดับความยาก
   Click Handling: ตรวจสอบช่องว่างและอัปเดต State
3. User Controls
   เลือกสัญลักษณ์ (X, O)
   ปรับขนาดบอร์ด
   เลือกความยากของ AI
4. Styling
   ใช้ CSS และ Bootstrap สำหรับการออกแบบ UI
