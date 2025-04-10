import express from "express";

const roomRouter = express.Router();

// POST Routes
roomRouter.post("/", (req, res) => {
  // Logic to create a new room
  res.status(201).json({ message: "Room created successfully" });
});

// GET Routes
roomRouter.get("/", (req, res) => {
  // Logic to get all rooms
  res.status(200).json({ message: "List of all rooms" });
});

roomRouter.get("/:id", (req, res) => {
  // Logic to get a room by ID
  const { id } = req.params;
  res.status(200).json({ message: `Room details for ID: ${id}` });
});

roomRouter.get("/:id/users", (req, res) => {
  // Logic to get all users in a room by room ID
  const { id } = req.params;
  res.status(200).json({ message: `List of users in room ID: ${id}` });
});

roomRouter.get("/:id/messages", (req, res) => {
  // Logic to get all messages in a room by room ID
  const { id } = req.params;
  res.status(200).json({ message: `List of messages in room ID: ${id}` });
});

// DELETE Routes
roomRouter.delete("/:id", (req, res) => {
  // Logic to delete a room by ID
  const { id } = req.params;
  res.status(200).json({ message: `Room with ID: ${id} deleted successfully` });
});

export default roomRouter;
