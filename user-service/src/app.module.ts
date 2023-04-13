import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ProvidersExampleModule } from 'providers-example/providers-example.module';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [ProvidersExampleModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, EmailService],
})
export class AppModule {}
