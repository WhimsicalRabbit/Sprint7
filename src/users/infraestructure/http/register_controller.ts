import { Register } from "../../application/register";
import { Request, Response } from "express";
import { User } from "../../domain/users";
import { HttpResponse } from "../../../backend/shared/http_response";

export class RegisterController {
  constructor(
    private readonly register: Register,
    private readonly HttpResponse: HttpResponse
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { body } = req;
      const newUser = new User(body.username, body.password);

      if (!body.username)
        return this.HttpResponse.BadRequest(res, `Username needed`);
      else if (!body.password)
        return this.HttpResponse.BadRequest(res, `Password needed`);

      const user = await this.register.run(newUser);

      if (!user)
        return this.HttpResponse.Conflict(
          res,
          `the username is already in use: ${body.username}`
        );

      return this.HttpResponse.Created(res, body.username);
    } catch (err) {
      return this.HttpResponse.Error(res, err);
    }
  }
}
