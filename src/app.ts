"use strict"

import * as express from "express";
import * as path from "path";
import * as mongoose from "mongoose";

import { HealthChecker } from "./healthcheck/HealthChecker";
import { MongooseServiceChecker } from "./healthcheck/MongooseServiceChecker";

mongoose.connect('mongodb://localhost/healthcheck');


class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    let router: express.Router;
    router = express.Router();

    router.get('/', (req, res, next) => {
      res.send('Hello world!');
    })

    this.app.use('/', router);

    let healthChecker = new HealthChecker();
    let mongoDBCheck = new MongooseServiceChecker(mongoose.connection);

    healthChecker.register("mongo", mongoDBCheck);
    this.app.use('/health', healthChecker.router);
  }

}

let server = new Server();
server.app.listen(3000, "localhost", () => {
  console.log('Listening on port 3000');
});