import { UserRepo } from "../domain/user_repo";
import { User } from "../domain/users";

export class Register {
  constructor(private readonly userRepo: UserRepo) {}

  async run(user: User): Promise<string | null> {
    const newUser = await this.userRepo.register(user);

    return newUser;
  }
}
