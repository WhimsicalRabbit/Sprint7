import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  user: { type: String, required: true },
  room: { type: String, required: true },
  text: { type: String, required: true }
});

export const chatModel = model("Chat", chatSchema);
