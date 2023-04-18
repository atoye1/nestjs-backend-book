import { Injectable, Logger, Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { DogHealthIndicator } from './dog.health';

@Injectable()
export class MyHealthCheckService {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private dogs: DogHealthIndicator,
  ) {}

  @Cron('*/5 * * * * *')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.rcom'),
      () => this.http.pingCheck('localhost', 'http://localhost:3000'),
      () => this.db.pingCheck('database'),
      () => this.dogs.isHealthy('dogs'),
    ]);
  }
}
