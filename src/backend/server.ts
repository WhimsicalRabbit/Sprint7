/* eslint-disable no-console */
import "./load-enviroment";
import server from "./app";
import mongoConnection from "../users/infraestructure/connect_database";

const port = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_URL!;
const connection = async () => {
  await mongoConnection(mongoUrl);
};

server.listen(port, () => {
  console.log("Server running on port " + port);
});

try {
  connection();
} catch (err) {
  console.log(err);
}

process.on("uncaughtException", () => {
  process.exit(1);
});
