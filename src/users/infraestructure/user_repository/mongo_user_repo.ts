/* eslint-disable no-console */
import { UserRepo } from "../../domain/user_repo";
import { User } from "../../domain/users";
import { userModel } from "../schemas/user_schema";
import bcrypt from "bcrypt";

export class MongoUserRepo implements UserRepo {
  async register(user: User): Promise<string | null> {
    const { username, password } = user;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username: username,
      password: passwordHash
    });

    const userdb = await userModel.findOne({ username });

    if (!userdb) {
      newUser.save();
      return username;
    } else {
      return null;
    }
  }

  async login(user: User): Promise<boolean> {
    const { username, password } = user;
    new userModel({
      username: username,
      password: password
    });

    const profile = await userModel.findOne({ username });
    const check =
      // eslint-disable-next-line no-ternary
      profile == null
        ? false
        : await bcrypt.compare(password, profile!.password);

    console.log(check);

    return check;
  }
}
