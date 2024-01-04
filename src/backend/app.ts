import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { type Request, type Response } from "express";
import path from "path";
import { userRouter } from "../users/infraestructure/http/user_router";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./client/client.html"));
});

app.use(express.json());
app.use("/", userRouter);

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket: Socket) => {
  // eslint-disable-next-line no-console
  console.log("User connected: " + socket.id);
});

export default server;
