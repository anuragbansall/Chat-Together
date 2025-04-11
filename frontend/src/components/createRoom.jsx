import React from "react";
import axios from "axios";
import { LuBotMessageSquare } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Form } from "./Form";

function CreateRoom({ setUser }) {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/rooms", {
        username,
        roomName: room,
      });

      const { roomId } = response.data.data;
      setUser(response.data.data.user);

      if (!roomId) {
        alert("Failed to create room");
        return;
      }

      navigate(`/chat/${roomId}`, {
        state: { username, roomId },
      });
    } catch (err) {
      console.error("Error creating room:", err);
      alert("Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form.Wrapper>
      <Form.Header
        icon={<LuBotMessageSquare size={40} className="text-[#A855F7]" />}
        title="Create a Chat Room"
        description="Enter your details to create a new chat room"
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
          label="Room Name"
          id="room"
          type="text"
          name="room"
          placeholder="Enter room name"
          required
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <Form.Link to="/join" text="Join an existing room" />
        <Form.Button
          icon={<BsPeople size={20} />}
          text="Create Room"
          isLoading={isLoading}
        />
      </Form.Root>
    </Form.Wrapper>
  );
}

export default CreateRoom;
