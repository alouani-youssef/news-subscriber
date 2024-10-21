import { Injectable } from '@nestjs/common';
import { HealthCheckService, HealthCheck, TypeOrmHealthIndicator, } from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private application: HealthCheckService,
    private postgresHealth: TypeOrmHealthIndicator,
  ) { }

  @HealthCheck()
  getPostgresConnectionHealth() {
    return this.application.check([
      () => this.postgresHealth.pingCheck('postgres'),
    ]);
  }

  @HealthCheck()
  getApplicationStatusHealth() {
    return this.application.check([]);
  }

  @HealthCheck()
  async getHealth() {
    return {
      postgres: await this.getPostgresConnectionHealth(),
      application: await this.getApplicationStatusHealth(),
    };
  }
}