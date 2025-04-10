import express from "express";
import {
  getRoomUsers,
  createRoom,
  getAllRooms,
  getRoomById,
  getRoomMessages,
  deleteRoom,
} from "../controllers/Room.controller.js";

const roomRouter = express.Router();

// POST Routes
roomRouter.post("/", createRoom);

// GET Routes
roomRouter.get("/", getAllRooms);

roomRouter.get("/:id", getRoomById);

roomRouter.get("/:id/users", getRoomUsers);

roomRouter.get("/:id/messages", getRoomMessages);

// DELETE Routes
roomRouter.delete("/:id", deleteRoom);

export default roomRouter;
