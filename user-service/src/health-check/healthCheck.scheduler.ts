import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { HealthCheckService } from './healthCheck.service';

@Injectable()
export class HealthCheckScheduler {
  constructor(private healthCheckService: HealthCheckService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  check() {
    return this.healthCheckService.checkDB();
  }
}
