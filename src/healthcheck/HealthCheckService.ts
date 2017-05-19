import { HealthStatus } from "./HealthStatus";

interface HealthCheckService {
  handleCheck(): HealthStatus
}

export {HealthCheckService}