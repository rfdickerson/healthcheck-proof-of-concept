"use strict"

import * as express from "express";
import * as path from "path";

import { HealthChecker } from "./healthcheck/HealthChecker";

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
    this.app.use('/health', new HealthChecker().router);
  }

}

let server = new Server();
server.app.listen(3000, "localhost", () => {
  console.log('Listening on port 3000');
});