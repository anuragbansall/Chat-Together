import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  roomDescription: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
