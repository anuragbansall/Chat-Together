import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import { PORT } from "./config/env.js";
import userRouter from "./routes/User.routes.js";
import roomRouter from "./routes/Room.routes.js";
import messageRouter from "./routes/Message.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/messages", messageRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/users", userRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
