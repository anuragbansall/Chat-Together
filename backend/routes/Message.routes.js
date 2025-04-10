import express from "express";
import { sendMessage } from "../controllers/Message.controller";

const messageRouter = express.Router();

// POST Routes
messageRouter.post("/", sendMessage);

export default messageRouter;
