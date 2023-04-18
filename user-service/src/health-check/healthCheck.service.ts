import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly connection: Connection,
    private logger: Logger,
  ) {}

  async checkDB(): Promise<boolean> {
    try {
      await this.connection.query('SELECT 1');
      this.logger.log('DB OK');
      return true;
    } catch (error) {
      this.logger.error('DB DOWN,Call 911 !!!!', error.stack);
      return false;
    }
  }
}
