import * as express from "express";

import {HealthCheckService} from "./HealthCheckService";
import {HealthStatus} from "./HealthStatus";

class HealthChecker {

  private startTime: number
  public router: express.Router;

  private services: [String, HealthCheckService];

  constructor() {
    this.router = express.Router();
    this.startTime = Date.now();
    this.setupRoutes();

  }

  private setupRoutes() {
    this.router.get('/', (req, res, next) => {

      let upTime = Date.now() - this.startTime;
      let status: HealthStatus = { 
        state: 'UP',
        upTime: upTime 
      }

      res.status(200);
      res.json(status);
    });
  }

  public register(name: string, checker: HealthCheckService) {
    this.services[name] = checker;
  }

}



export { HealthChecker };