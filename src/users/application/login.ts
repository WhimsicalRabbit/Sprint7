import { UserRepo } from "../domain/user_repo";
import { User } from "../domain/users";

export class Login {
  constructor(private readonly userRepo: UserRepo) {}

  async run(user: User): Promise<string | null> {
    const check = await this.userRepo.login(user);

    return check;
  }
}
