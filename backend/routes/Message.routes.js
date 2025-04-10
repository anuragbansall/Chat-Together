import express from "express";

const messageRouter = express.Router();

// POST Routes
messageRouter.post("/", (req, res) => {
  // Logic to send a message in a room
  const { roomId, message } = req.body;
  res
    .status(201)
    .json({ message: `Message sent to room ID: ${roomId}`, content: message });
});

export default messageRouter;
