import express from "express";
import {
  getUsersInRoom,
  joinRoom,
  leaveRoom,
} from "../controllers/User.controller.js";

const userRouter = express.Router();

// GET Routes
userRouter.get("/:roomId", getUsersInRoom);

// POST Routes
userRouter.post("/", joinRoom);

// DELETE Routes
userRouter.delete("/:roomId/:username", leaveRoom);

export default userRouter;
