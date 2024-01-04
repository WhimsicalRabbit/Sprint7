import express from "express";
import { registerController } from "../dependencies";

const userRouter = express.Router();

userRouter.post("/", registerController.run.bind(registerController));

export { userRouter };
