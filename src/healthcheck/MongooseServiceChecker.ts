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

import { IHealthCheckService, IHealthStatus } from "./HealthChecker";

import * as mongoose from "mongoose";

class MongooseServiceChecker implements IHealthCheckService {

  private connection: mongoose.Connection;

  constructor(connection: mongoose.Connection) {
    this.connection = connection;
  }

  public handleCheck(): IHealthStatus {

    const state = this.connection.readyState;

    return {
      status: this.readyStateLabel(state),
    };
  }

  private readyStateLabel(x: number): string {
    switch (x) {
      case 0: return "disconnected";
      case 1: return "connected";
      case 2: return "connecting";
      case 3: return "disconnecting";
      default: return "";
    }
  }

}

export { MongooseServiceChecker };
