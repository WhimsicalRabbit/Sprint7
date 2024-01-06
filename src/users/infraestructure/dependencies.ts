import { HttpResponse } from "../../backend/shared/http_response";
import { Login } from "../application/login";
import { Register } from "../application/register";
import { LoginController } from "./http/login_controller";
import { RegisterController } from "./http/register_controller";
import { MongoUserRepo } from "./user_repository/mongo_user_repo";

const mongoRepo = new MongoUserRepo();
const httpResponse = new HttpResponse();

const register = new Register(mongoRepo);
const registerController = new RegisterController(register, httpResponse);

const login = new Login(mongoRepo);
const loginController = new LoginController(login, httpResponse);

export { registerController, loginController };
