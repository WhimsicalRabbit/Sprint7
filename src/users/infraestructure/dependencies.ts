import { HttpResponse } from "../../backend/shared/http_response";
import { Register } from "../application/register";
import { RegisterController } from "./http/register_controller";
import { MongoUserRepo } from "./user_repository/mongo_user_repo";

const mongoRepo = new MongoUserRepo();
const httpResponse = new HttpResponse();

const register = new Register(mongoRepo);
const registerController = new RegisterController(register, httpResponse);

export { registerController };
