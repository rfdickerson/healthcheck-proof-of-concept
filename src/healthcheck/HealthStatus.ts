
interface IHealthStatus {
  state: string;
  upTime?: number;
  services?: [string, IHealthStatus];
}

export { IHealthStatus };
