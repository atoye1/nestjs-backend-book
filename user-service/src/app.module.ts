import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersExampleModule } from 'providers-example/providers-example.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from 'config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleWare } from './logger/logger.middleware';
import { LoggerMiddleWare2 } from './logger/logger.middleware2';
import { UsersController } from 'users/users.controller';
import { AuthService } from './auth/auth.service';
import { ExceptionModule } from './exception/exception.module';
import emailConfig from 'config/emailConfig';
import authConfig from 'config/authConfig';
import { ormConfig } from 'config/ormConfig';
import { LoggingModule } from 'logging/logging.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ProvidersExampleModule,
    UsersModule,
    ConfigModule.forRoot({
      // forRoot로 설정해서 emailConfig란 동적 Config 객체가 전체 스코프에 주입가능해졌다.
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig], // load를 통해 앞에서 지정한 ConfigFactory를 지정한다.
      isGlobal: true, // 글로벌 스코프에서 사용가능하도록 한다.
      validationSchema: validationSchema, // joi를 활용한 유효성 검사 객체를 추가한다.
    }),
    TypeOrmModule.forRootAsync(ormConfig),
    ExceptionModule,
    LoggingModule,
    BatchModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 미들웨어를 어디에 적용할지 지정할 수 있음
    // exclude, forRoutes로 경로를 손쉽게 지정가능
    // consumer
    //   .apply(LoggerMiddleWare, LoggerMiddleWare2)
    //   .exclude('/noLogger')
    //   .forRoutes('/');
    // forRoute에는 경로 이외에도 컨트롤러 클래스를 바로 전달할 수 있음
    // consumer
    //   .apply(LoggerMiddleWare, LoggerMiddleWare2)
    //   .forRoutes(UsersController);
  }
}
