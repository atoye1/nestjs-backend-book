import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './httpException.filter';

@Module({
  providers: [
    Logger, // Logger를 주입받아 사용하기 위해서 exception모듈의 프로바이더에 추가해준다.
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ExceptionModule {}
