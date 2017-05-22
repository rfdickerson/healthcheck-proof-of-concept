import * as express from "express";

import { IHealthCheckService } from "./HealthCheckService";
import { IHealthStatus } from "./HealthStatus";

class HealthChecker {

  public router: express.Router;
  private startTime: number;

  private services: {string, HealthCheckService};

  constructor() {
    this.router = express.Router();
    this.startTime = Date.now();

    this.setupRoutes();
  }

  public register(name: string, checker: IHealthCheckService) {
    this.services[name] = checker;
  }

  private setupRoutes() {
    this.router.get("/", (req, res, next) => {

      const upTime = Date.now() - this.startTime;

      const servicesStatus = Object.keys(this.services).map( (s) => {
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
