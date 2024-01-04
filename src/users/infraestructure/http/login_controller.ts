/* import { Request, Response } from "express";
import { Login } from "../../application/login";

export class LoginController {
  constructor(private readonly login: Login) {}

  async run(req: Request, res: Response) {
    const { body } = req;
    const { username, password } = body;

    const user = await Users.findOne({ username });

    const check = user == null ? false : await bcrypt.compare;
  }
}
 */
