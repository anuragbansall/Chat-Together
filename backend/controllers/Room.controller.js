import Room from "../models/Room.model.js";
import User from "../models/User.model.js";
import Message from "../models/Message.model.js";
import { v4 as uuidv4 } from "uuid";

export const createRoom = async (req, res, next) => {
  try {
    const { roomName, roomDescription } = req.body;
    const roomId = uuidv4();

    const existing = await Room.findOne({ roomName });
    if (existing) {
      const error = new Error("Room already exists");
      error.status = 400;
      return next(error);
    }

    const newRoom = new Room({
      roomId,
      roomName,
      roomDescription,
    });

    await newRoom.save();

    res.status(201).json({
      status: "success",
      message: "Room created successfully",
      data: {
        newRoom,
      },
    });
  } catch (error) {
    next(error);
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
    const { id } = req.params;
    const room = await Room.findById(id).populate("users").populate("messages");

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
