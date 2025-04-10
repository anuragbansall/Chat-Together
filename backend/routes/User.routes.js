import express from "express";
import { joinRoom, leaveRoom } from "../controllers/User.controller";

const userRouter = express.Router();

// GET Routes
userRouter.get("/:roomId", );


// POST Routes
userRouter.post("/", joinRoom);


// DELETE Routes
userRouter.delete("/:roomId/:username", leaveRoom);

export default userRouter;
