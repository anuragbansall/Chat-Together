import User from "../models/User.model.js";
import Room from "../models/Room.model.js";
import { v4 as uuidv4 } from "uuid";

export const getUsersInRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const users = await User.find({ roomId });

    if (!users || users.length === 0) {
      const error = new Error("No users found in this room");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: {
        users,
        roomId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const joinRoom = async (req, res, next) => {
  try {
    let { roomId, username } = req.body;

    if (!roomId || !username) {
      return res.status(400).json({
        status: "fail",
        message: "roomId and username are required",
      });
    }

    // Check if room exists
    let room = await Room.findById(roomId);

    if (!room) {
      // If room doesn't exist
      const newRoom = await Room.create({ roomId: uuidv4(), users: [] });
      room = newRoom;
    }

    const user = await User.create({ username, roomId: room._id });

    await Room.findByIdAndUpdate(room._id, {
      $push: { users: user._id },
    });

    return res.status(200).json({
      status: "success",
      message: "Joined room successfully",
      data: {
        roomId: room._id,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const leaveRoom = async (req, res, next) => {
  try {
    const { roomId, username } = req.params;

    const roomExists = await Room.findById(roomId);
    if (!roomExists) {
      const error = new Error("Room not found");
      error.statusCode = 404;
      throw error;
    }

    const user = await User.findOneAndDelete({
      username,
      roomId,
    });
    if (!user) {
      const error = new Error("User not found in room");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      message: "User left room",
      data: {
        user,
        roomId,
      },
    });
  } catch (error) {
    next(error);
  }
};
