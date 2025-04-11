import React, { useEffect } from "react";
import { ImExit } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";

function ChatRoom({
  messages,
  setMessages,
  user,
  setUser,
  roomName,
  setRoomName,
  roomUsers,
  setRoomUsers,
}) {
  const [message, setMessage] = React.useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    console.log("Sending message:", message);
    setMessage("");
  };

  const handleLeaveRoom = () => {
    console.log("Leaving room");
    // Logic to leave the room
  };

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/rooms/${roomId}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Room data:", data);
          setRoomUsers(data.data?.room.roomUsers || []);
          setMessages(data.data?.room.messages || []);
          setRoomName(data.data?.room.roomName || "");
        } else {
          console.error("Failed to fetch room data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  return (
    <div className="h-scren w-full grow-1 flex bg-white">
      {/* Sidebar */}
      <aside className="w-1/5 hidden xl:flex flex-col p-4 border-r-1 border-gray-300 shrink-0">
        <h2 className="text-xl font-semibold mb-4">
          Room:{" "}
          <span className="">
            {roomName.length > 0 ? roomName : "Loading..."}
          </span>
        </h2>
        <p className="bg-[#EDE9FE] text-[#A855F7] w-fit px-2 py-1 rounded-full font-semibold">
          <span>{roomUsers.length > 0 ? roomUsers.length : 0}</span> user online
        </p>

        <button
          className="danger-button mt-auto w-full"
          onClick={handleLeaveRoom}
        >
          <ImExit size={20} />
          Leave Room
        </button>
      </aside>

      {/* Chat Area */}
      <main className="w-full grow-1 flex flex-col">
        <header className="w-full p-4 border-b-1 border-gray-300 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-semibold">
            Chat Room:{" "}
            <span className="">
              {roomName.length > 0 ? roomName : "Loading..."}
            </span>
          </h2>
          <button className="danger-button" onClick={handleLeaveRoom}>
            <ImExit size={20} />
            Leave
          </button>
        </header>

        {/* Messages */}
        <div className="grow-1 flex flex-col p-4 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{message.user}</p>
                <p>{message.text}</p>
              </div>
            ))
          ) : (
            <p className="m-auto text-zinc-500">
              No messages yet, Start the conversation!
            </p>
          )}
        </div>

        {/* Message Input */}
        <form
          className="w-full p-4 border-t-1 border-gray-300 flex items-center shrink-0"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-2 border-1 border-gray-300 rounded-lg mr-2 outline-none focus:border-[#A855F7]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="primary-button">
            <IoIosSend size={20} />
          </button>
        </form>
      </main>
    </div>
  );
}

export default ChatRoom;
