import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.addCronJob();
  }

  // @Cron(CronExpression.EVERY_10_SECONDS, { name: 'DB Health Check' })
  handleCron() {
    this.logger.log(`${new Date()} Cron Task Called`);
  }

  addCronJob() {
    const name = '5cronSample';

    const job = new CronJob('*/5 * * * * *', () => {
      this.logger.warn(`RUNNING! ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    this.logger.warn(`${name} Added!`);
  }
}
