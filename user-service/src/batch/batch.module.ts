import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { BatchController } from './batch.controller';
import { HealthCheckController } from 'health-check/healthCheck.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [TaskService, Logger],
})
export class BatchModule {}
