import React from "react";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/ChatRoom";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = React.useState(null);
  const [roomName, setRoomName] = React.useState("");
  const [roomUsers, setRoomUsers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);

  console.table({
    user,
    roomName,
    roomUsers,
    messages,
  });

  return (
    <div className="min-h-screen w-full bg-[#F9F3FC] flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<JoinRoom setUser={setUser} />} />
        <Route
          path="/chat/:roomId"
          element={
            <ChatRoom
              messages={messages}
              setMessages={setMessages}
              user={user}
              setUser={setUser}
              roomName={roomName}
              setRoomName={setRoomName}
              roomUsers={roomUsers}
              setRoomUsers={setRoomUsers}
            />
          }
        />
        <Route path="*" element={<JoinRoom />} />
      </Routes>
    </div>
  );
}

export default App;
