import React from "react";
import axios from "axios";
import { LuBotMessageSquare } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function JoinRoom({ setUser }) {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/users", {
        username,
        roomId: room,
      });

      const { roomId } = response.data.data;
      setUser(response.data.data.user);
      setIsLoading(false);

      if (!roomId) {
        alert("Room not found or invalid room ID");
        return;
      }

      navigate(`/chat/${roomId}`, {
        state: { username, roomId },
      });
    } catch (err) {
      console.error("Error joining room:", err);
      alert("Failed to join room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg flex flex-col items-center justify-center gap-y-2 max-w-full w-full md:w-fit h-screen md:h-fit">
      <span className="bg-[#EDE9FE] p-4 rounded-full">
        <LuBotMessageSquare size={40} className="text-[#A855F7]" />
      </span>

      <h1 className="text-2xl font-bold text-[#A855F7]">Chat Together</h1>
      <p className="text-zinc-500 text-center">
        Enter your details to join a chat room
      </p>

      <form
        className="flex flex-col gap-y-4 w-sm mt-4 max-w-full"
        onSubmit={handleSubmit}
      >
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

        <Link to="/create" className="text-[#A855F7] hover:underline">
          Create a new room
        </Link>

        <button className="primary-button">
          <BsPeople size={20} />
          {isLoading ? "Joining..." : "Join Room"}
        </button>
      </form>
    </div>
  );
}

export default JoinRoom;
