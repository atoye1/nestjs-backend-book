import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'My Cron Task' })
  handleCron() {
    this.logger.log(`${new Date()} Cron Task Called`);
  }
}
