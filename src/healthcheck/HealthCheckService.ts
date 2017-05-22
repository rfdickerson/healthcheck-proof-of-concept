import { IHealthStatus } from "./HealthStatus";

interface IHealthCheckService {
  handleCheck(): IHealthStatus;
}

export {IHealthCheckService};
