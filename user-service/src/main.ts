import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerConfig } from 'config/loggerConfig';
import { HttpExceptionFilter } from 'exception/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, loggerConfig);
  // Validation Pipe를 전역으로 사용해서 모든 가능한 객체에 대해 Validation을 실시
  // class-transformer 사용을 위한 옵션 전달.
  // 전역으로 사용할때는 인스턴스화를 수동으로 해줘야 한다.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
