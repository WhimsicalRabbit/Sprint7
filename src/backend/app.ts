import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { type Request, type Response } from "express";
import { userRouter } from "../users/infraestructure/http/user_router";
import Logger from "morgan";
import { authentication } from "./middlewares/auth_middleware";
import cookieParser from "cookie-parser";
import { redirectUnmatched } from "./middlewares/redirect_middleware";
import { saveChat } from "../chat/infraestructure/mongo_chat_repository";
import { chatHistory } from "../chat/infraestructure/mongo_chat_repository";
import { Chat } from "../chat/domain/chat";

const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(Logger("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);

app.get("/login", (_req: Request, res: Response) => {
  res.sendFile(process.cwd() + "/client/login.html");
});

app.use(authentication);

app.get("/chat", (_req: Request, res: Response) => {
  res.sendFile(process.cwd() + "/client/client.html");
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

/* 

********************** IO CONNECTION ************************** 

*/

io.on("connection", (socket: Socket) => {
  // eslint-disable-next-line no-console
  console.log("Rabbit🐇🌐 connected with id: " + socket.id);

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log("A rabbit has disconnected 🐇🚫🌐");
  });

  socket.on("chat_message", (msg: string, room: string, username: string) => {
    const chat = new Chat(username, room, msg);

    saveChat(chat);

    socket.to(room).emit("chat_message", msg, username);
  });

  socket.on("join_room", async (room: string, cb) => {
    const chats = await chatHistory(room);

    socket.join(room);
    cb(chats);
  });
});

app.use(redirectUnmatched);

export default server;
