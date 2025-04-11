import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import Room from "../models/Room.model.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { roomId, text, senderId } = req.body;

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const newMessage = new Message({
      sender: senderId,
      roomId,
      text,
    });

    await newMessage.save();

    room.messages.push(newMessage._id);
    await room.save();

    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};
