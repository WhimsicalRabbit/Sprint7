import { User } from "./users";

export interface UserRepo {
  register(user: User): Promise<string | null>;
  login(password: string): Promise<boolean>;
}
