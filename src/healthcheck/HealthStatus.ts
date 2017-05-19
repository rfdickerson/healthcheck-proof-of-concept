
interface HealthStatus {
  state: string;
  upTime?: number;
  services?: [string, HealthStatus];
}

export { HealthStatus }