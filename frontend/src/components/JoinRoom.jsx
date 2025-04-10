import React from "react";
import { LuBotMessageSquare } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";

function JoinRoom() {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      room: room,
    };

    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg flex flex-col items-center justify-center gap-y-2">
      <span className="bg-[#EDE9FE] p-4 rounded-full">
        <LuBotMessageSquare size={40} className="text-[#A855F7]" />
      </span>

      <h1 className="text-2xl font-bold text-[#A855F7]">Chat Together</h1>
      <p className="text-zinc-500 text-center">
        Enter your details to join a chat room
      </p>

      <form className="flex flex-col gap-y-4 w-sm mt-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="room">Room ID</label>
          <input
            type="text"
            id="room"
            name="room"
            placeholder="Enter room ID"
            required
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button className="primary-button">
          <BsPeople size={20} />
          Join Room
        </button>
      </form>
    </div>
  );
}

export default JoinRoom;
