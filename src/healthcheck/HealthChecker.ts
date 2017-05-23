/*
 * Copyright IBM Corporation 2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as express from "express";

// stores the service checkers such as mongo, redis, and postgresql
interface IServiceList {
  [index: string]: IHealthCheckService;
}

interface IServiceHealthList {
  [index: string]: IHealthStatus;
}

interface IHealthCheckService {
  name?: string;
  handleCheck(): IHealthStatus;
}

interface IHealthStatus {
  // up, down, connecting, disconnecting
  status: string;

  // up time in milliseconds
  uptime?: number;

  // list of services
  services?: {[s: string]: IHealthStatus};
}

class HealthChecker {

  public router: express.Router;
  private startTime: number;

  private services: IServiceList;
  private isUp: boolean;

  constructor() {
    this.router = express.Router();
    this.startTime = Date.now();
    this.services = {};
    this.isUp = true;

    this.setupRoutes();
  }

  /**
   * Register a new service health check.
   * @param name {string}
   * @param checker {IHealthCheckService}
   */
  public register(name: string, checker: IHealthCheckService) {
    this.services[name] = checker;
  }

  /**
   * Resets the uptime
   */
  public reset() {
    this.startTime = Date.now();
  }

  private setupRoutes() {
    this.router.get("/", (req, res, next) => {

      const uptime = Date.now() - this.startTime;

      const x: IServiceHealthList = {};

      Object.keys(this.services).forEach((element) => {
        x[element] = this.services[element].handleCheck();
      });

      const status: IHealthStatus = {
        services: x,
        status: this.isUp ? "up" : "down",
        uptime,
      };

      if (this.isUp) {
        res.status(200);
      } else {
        res.status(500);
      }

      res.json(status);
    });
  }

}

export { HealthChecker, IHealthStatus, IHealthCheckService };
