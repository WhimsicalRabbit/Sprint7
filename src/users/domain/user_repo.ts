import { User } from "./users";

export interface UserRepo {
  register(user: User): Promise<string | null>;
  login(user: User): Promise<boolean>;
}
