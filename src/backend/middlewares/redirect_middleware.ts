import { type Request, type Response } from "express";

export const redirectUnmatched = (req: Request, res: Response): void => {
  console.log(req.url);
  res.redirect("http://localhost:8080/login");
};
