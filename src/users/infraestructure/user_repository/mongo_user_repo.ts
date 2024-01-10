import { UserRepo } from "../../domain/user_repo";
import { User } from "../../domain/users";
import { userModel } from "../schemas/user_schema";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

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

  async login(user: User): Promise<string | null> {
    const { username, password } = user;
    new userModel({
      username: username,
      password: password
    });

    const profile = await userModel.findOne({ username });

    if (!profile) {
      return null;
    }

    const check = await bcrypt.compare(password, profile!.password);

    if (!check) {
      return null;
    }

    const userForToken = {
      id: profile._id,
      username: profile.username
    };

    const token = jwt.sign(userForToken, process.env.SECRET!);

    return token;
  }
}
