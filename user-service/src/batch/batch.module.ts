import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { BatchController } from './batch.controller';
import { HealthCheckController } from 'health-check/healthCheck.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DogHealthIndicator } from 'health-check/dog.health';
import { MyHealthCheckService } from 'health-check/MyHealthCheck.service';

@Module({
  imports: [ScheduleModule.forRoot(), TerminusModule],
  controllers: [BatchController],
  providers: [TaskService, Logger, DogHealthIndicator, MyHealthCheckService],
})
export class BatchModule {}
