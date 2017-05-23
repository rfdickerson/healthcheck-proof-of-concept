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

import { IHealthCheckService } from "./HealthCheckService";
import { IHealthStatus } from "./HealthStatus";

class HealthChecker {

  public router: express.Router;
  private startTime: number;

  private services: IHealthCheckService[];

  constructor() {
    this.router = express.Router();
    this.startTime = Date.now();
    this.services = [];

    this.setupRoutes();
  }

  public register(name: string, checker: IHealthCheckService) {
    this.services[name] = checker;
  }

  private setupRoutes() {
    this.router.get("/", (req, res, next) => {

      const upTime = Date.now() - this.startTime;

      const servicesStatus = Object.keys(this.services).map((s) => {
        return [];
      });

      const status: IHealthStatus = {
        state: "UP",
        upTime,
      };

      res.status(200);
      res.json(status);
    });
  }

}

export { HealthChecker };
