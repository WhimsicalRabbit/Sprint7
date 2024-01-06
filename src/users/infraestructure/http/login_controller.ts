import { Request, Response } from "express";
import { Login } from "../../application/login";
import { HttpResponse } from "../../../backend/shared/http_response";
import { User } from "../../domain/users";

export class LoginController {
  constructor(
    private readonly login: Login,
    private readonly httpResponse: HttpResponse
  ) {}

  async run(req: Request, res: Response) {
    const { body } = req;
    const newUser = new User(body.username, body.password);

    if (!body.username)
      return this.httpResponse.BadRequest(res, `Username needed`);
    else if (!body.password)
      return this.httpResponse.BadRequest(res, `Password needed`);

    const user = await this.login.run(newUser);

    if (user) return this.httpResponse.Ok(res, `${user}`);
    else
      return this.httpResponse.Unauthorized(
        res,
        `Username or password is not correct`
      );
  }
}
