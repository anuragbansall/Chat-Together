import express from "express";

const userRouter = express.Router();

// GET Routes
userRouter.get("/:roomId", (req, res) => {
  // Logic to get all users in a room
  const { roomId } = req.params;
  res.status(200).json({ message: `List of all users in room ID: ${roomId}` });
});

// POST Routes
userRouter.post("/", (req, res) => {
  //   Logic to join a user to a room
  const { roomId } = req.body;
  res.status(201).json({ message: `User joined room ID: ${roomId}` });
});

// DELETE Routes
userRouter.delete("/:roomId", (req, res) => {
  // Logic to remove a user from a room
  const { roomId } = req.params;
  res.status(200).json({ message: `User removed from room ID: ${roomId}` });
});

export default userRouter;
