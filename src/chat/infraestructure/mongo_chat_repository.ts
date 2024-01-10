import { Chat } from "../domain/chat";
import { chatModel } from "./schemas/chat_schema";

const saveChat = (chat: Chat) => {
  const { username, room, text } = chat;

  const newChat = new chatModel({
    user: username,
    room: room,
    text: text
  });

  newChat.save().catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
};

const chatHistory = async (room: string): Promise<Array<object>> => {
  const chats = await chatModel.find({ room });

  const messagesAndUsers = chats.map((chat) => ({
    text: chat.text,
    user: chat.user
  }));

  return messagesAndUsers;
};

export { saveChat, chatHistory };
