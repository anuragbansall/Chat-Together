import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import { LuBotMessageSquare } from "react-icons/lu";
import { Form } from "./Form";

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
    <Form.Wrapper>
      <Form.Header
        icon={<LuBotMessageSquare size={40} className="text-[#A855F7]" />}
        title="Chat Together"
        description="Enter your details to join a chat room"
      />

      <Form.Root onSubmit={handleSubmit}>
        <Form.Group
          label="Your Name"
          id="username"
          type="text"
          name="username"
          placeholder="Enter your name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Group
          label="Room ID"
          id="room"
          type="text"
          name="room"
          placeholder="Enter room ID"
          required
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <Form.Link to="/create" text="Create a new room" />

        <Form.Button
          icon={<BsPeople size={20} />}
          text="Join Room"
          isLoading={isLoading}
        />
      </Form.Root>
    </Form.Wrapper>
  );
}

export default JoinRoom;
