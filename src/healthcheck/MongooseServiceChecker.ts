import { HealthCheckService } from "./HealthCheckService";
import { HealthStatus } from "./HealthStatus";

import * as mongoose from "mongoose";

class MongooseServiceChecker implements HealthCheckService {

  private connection: mongoose.Connection;

  constructor(connection: mongoose.Connection) {
    this.connection = connection;
  }

  public handleCheck(): HealthStatus {
    let state = this.connection.readyState;
    console.log(state);

    return {
      state: "connected"
    }
  }

}

export { MongooseServiceChecker };