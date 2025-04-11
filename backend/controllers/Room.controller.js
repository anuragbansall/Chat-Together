import Room from "../models/Room.model.js";
import User from "../models/User.model.js";
import Message from "../models/Message.model.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export const createRoom = async (req, res, next) => {
  try {
    const { roomName, username } = req.body;
    if (!roomName || !username) {
      const error = new Error("Room name and username are required");
      error.status = 400;
      return next(error);
    }

    const existing = await Room.findOne({ roomName });
    if (existing) {
      const error = new Error("Room name already exists");
      error.status = 400;
      return next(error);
    }

    const roomId = uuidv4();
    const newRoom = new Room({
      roomId,
      roomName,
    });

    const userId = uuidv4();
    const newUser = new User({
      userId,
      username,
      roomId,
    });

    newRoom.users.push(newUser._id);
    newUser.rooms.push(newRoom._id);

    await newUser.save();
    await newRoom.save();

    res.status(201).json({
      status: "success",
      message: "Room and user created successfully",
      data: {
        roomId,
        user: newUser,
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms =
      req.query.details === "full"
        ? await Room.find().populate("users").populate("messages")
        : await Room.find();

    res.status(200).json({
      status: "success",
      message: "List of all rooms",
      data: {
        rooms,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const { id: roomId } = req.params;
    const room = await Room.findOne({ roomId })
      .populate("users")
      .populate("messages");

    if (!room) {
      const error = new Error("Room not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Room details",
      data: {
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate("users");

    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "Room not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "List of users in the room",
      data: {
        users: room.users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate({
      path: "messages",
      populate: { path: "sender" },
    });

    if (!room) {
      const error = new Error("Room not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "List of messages in the room",
      data: {
        messages: room.messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({
        status: "fail",
        message: "Room not found",
      });
    }

    await room.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Room deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const leaveRoom = async (req, res, next) => {
  try {
    const { id: roomId } = req.params;
    const { userId } = req.body;

    const room = await Room.findOne({ roomId });
    if (!room) {
      const error = new Error("Room not found");
      error.status = 404;
      return next(error);
    }

    room.users = room.users.filter((user) => user.toString() !== userId);
    await room.save();

    // Update User rooms
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { rooms: room._id } },
      { new: true }
    );
    if (!updatedUser) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "User left the room successfully",
      data: {
        room,
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
