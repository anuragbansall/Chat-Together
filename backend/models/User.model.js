import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.index({ username: 1, roomId: 1 }, { unique: true }); 
const User = mongoose.model("User", userSchema);
export default User;
