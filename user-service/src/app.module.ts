import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersExampleModule } from 'providers-example/providers-example.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'config/emailConfig';
import { validationSchema } from 'config/validationSchema';

@Module({
  imports: [
    ProvidersExampleModule,
    UsersModule,
    ConfigModule.forRoot({
      // forRoot로 설정해서 emailConfig란 동적 Config 객체가 전체 스코프에 주입가능해졌다.
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig], // load를 통해 앞에서 지정한 ConfigFactory를 지정한다.
      isGlobal: true, // 글로벌 스코프에서 사용가능하도록 한다.
      validationSchema: validationSchema, // joi를 활용한 유효성 검사 객체를 추가한다.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
