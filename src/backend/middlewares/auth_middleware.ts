import { type NextFunction, type Request, type Response } from "express";
import * as jwt from "jsonwebtoken";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, process.env.SECRET!);
  } catch (err) {
    res.status(400).json({
      status: 400,
      statusMsg: "Bad Request",
      error: "token missing or invalid"
    });
  }

  if (token == "" || !decodedToken) {
    res.status(401).json({
      status: 403,
      statusMsg: "Unauthorized",
      error: "Token missing or invalid"
    });
  }

  next();
  return;
};
