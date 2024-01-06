import express from "express";
import { registerController, loginController } from "../dependencies";

const userRouter = express.Router();

userRouter.post("/register", registerController.run.bind(registerController));

userRouter.post("/login", loginController.run.bind(loginController));

export { userRouter };
