import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersExampleModule } from 'providers-example/providers-example.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'config/emailConfig';
import { validationSchema } from 'config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // 서버 구동시 엔티티 기반으로 스키마를 변경하는 옵션
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
