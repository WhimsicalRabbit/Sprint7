import { UserRepo } from "../domain/user_repo";
import { FailedCheck } from "./check_failed";

export class Login {
  constructor(private readonly userRepo: UserRepo) {}

  async run(password: string): Promise<boolean> {
    const check = await this.userRepo.login(password);

    if (!password) {
      throw new FailedCheck();
    }

    return check;
  }
}
