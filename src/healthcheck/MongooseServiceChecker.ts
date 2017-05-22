import { IHealthCheckService } from "./HealthCheckService";
import { IHealthStatus } from "./HealthStatus";

import * as mongoose from "mongoose";

class MongooseServiceChecker implements IHealthCheckService {

  private connection: mongoose.Connection;

  constructor(connection: mongoose.Connection) {
    this.connection = connection;
  }

  public handleCheck(): IHealthStatus {
    const state = this.connection.readyState;

    return {
      state: "connected",
    };
  }

}

export { MongooseServiceChecker };
