import { Register } from "../../application/register";
import { Request, Response } from "express";
import { User } from "../../domain/users";
import { HttpResponse } from "../../../backend/shared/http_response";

export class RegisterController {
  constructor(
    private readonly register: Register,
    private readonly httpResponse: HttpResponse
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { body } = req;
      const newUser = new User(body.username, body.password);

      if (!body.username)
        return this.httpResponse.BadRequest(res, `Username needed`);
      else if (!body.password)
        return this.httpResponse.BadRequest(res, `Password needed`);

      const user = await this.register.run(newUser);

      if (!user)
        return this.httpResponse.Conflict(
          res,
          `the username is already in use: ${body.username}`
        );

      return this.httpResponse.Created(res, body.username);
    } catch (err) {
      return this.httpResponse.Error(res, err);
    }
  }
}
