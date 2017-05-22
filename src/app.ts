
import * as express from "express";
import * as mongoose from "mongoose";
import * as path from "path";

import { HealthChecker } from "./healthcheck/HealthChecker";
import { MongooseServiceChecker } from "./healthcheck/MongooseServiceChecker";

mongoose.connect("mongodb://localhost/healthcheck");

class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    let router: express.Router;
    router = express.Router();

    router.get("/", (req, res, next) => {
      res.send("Hello world!");
    });

    this.app.use("/", router);

    const healthChecker = new HealthChecker();
    const mongoDBCheck = new MongooseServiceChecker(mongoose.connection);

    healthChecker.register("mongo", mongoDBCheck);
    this.app.use("/health", healthChecker.router);
  }

}

const server = new Server();
server.app.listen(3000, "localhost", () => {
  // console.log("Listening on port 3000");
});
