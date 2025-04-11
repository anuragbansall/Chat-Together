import React from "react";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#F9F3FC] flex flex-col items-center justify-center">
      {/* <JoinRoom /> */}
      <ChatRoom />
    </div>
  );
}

export default App;
