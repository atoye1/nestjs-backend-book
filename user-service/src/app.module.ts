import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersExampleModule } from 'providers-example/providers-example.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProvidersExampleModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
