import React from "react";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#F9F3FC] flex flex-col items-center justify-center">
      {/* <JoinRoom /> */}
      {/* <ChatRoom /> */}
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />
        <Route path="*" element={<JoinRoom />} />
      </Routes>
    </div>
  );
}

export default App;
