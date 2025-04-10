import mongoose from "mongoose";
import User from "./User.model.js";
import Message from "./Message.model.js";

const roomSchema = new mongoose.Schema(
  {
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
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

roomSchema.pre("deleteOne", async function (next) {
  const roomId = this.getFilter()._id;
  try {
    const room = await this.model.findById(roomId).populate("messages");
    if (room) {
      await Message.deleteMany({ _id: { $in: room.messages } });

      await User.updateMany(
        { _id: { $in: room.users } },
        { $pull: { rooms: roomId } }
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
