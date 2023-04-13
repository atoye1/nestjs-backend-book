import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ProvidersExampleModule } from 'providers-example/providers-example.module';

@Module({
  imports: [ProvidersExampleModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
