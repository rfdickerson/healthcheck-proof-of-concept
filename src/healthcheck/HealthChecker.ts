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

  private handleCheck: () => boolean;

  constructor() {
    this.router = express.Router();
    this.startTime = Date.now();
    this.services = {};
    this.isUp = true;

    this.setupRoutes();
  }

  /**
   * register a new service health check.
   * @param name {string}
   * @param checker {IHealthCheckService}
   */
  public register(name: string, checker: IHealthCheckService) {
    this.services[name] = checker;
  }

  public onCheck( f: () => boolean) {
    this.handleCheck = f;
  }

  /**
   * resets the uptime
   */
  public reset() {
    this.startTime = Date.now();
  }

  private setupRoutes() {
    this.router.get("/", (req, res, next) => {

      const currentState = this.handleCheck ? this.handleCheck() : true;

      // if moving from down to up state
      if (currentState && !this.isUp) {
        this.startTime = Date.now();
      }

      this.isUp = currentState;

      const uptime = Date.now() - this.startTime;

      const servicesStatus: IServiceHealthList = {};

      Object.keys(this.services).forEach((service) => {
        servicesStatus[service] = this.services[service].handleCheck();
      });

      const status: IHealthStatus = {
        services: servicesStatus,
        status: this.isUp ? "UP" : "DOWN",
        uptime: this.isUp ? uptime : 0,
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
