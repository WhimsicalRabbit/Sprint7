/* eslint-disable no-console */
import { UserRepo } from "../../domain/user_repo";
import { User } from "../../domain/users";
import { userModel } from "../schemas/user_schema";

export class MongoUserRepo implements UserRepo {
  async register(user: User): Promise<string | null> {
    const { username, password } = user;
    const newUser = new userModel({
      username: username,
      password: password
    });

    const userdb = await userModel.findOne({ username });

    if (!userdb) {
      newUser.save();
      return username;
    } else {
      return null;
    }
  }

  async login(password: string): Promise<boolean> {
    if (!password) {
      password = "";
    }

    return false;
  }
}
