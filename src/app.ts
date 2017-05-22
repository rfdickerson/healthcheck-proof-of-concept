/*
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
 */

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
