import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation Pipe를 전역으로 사용해서 모든 가능한 객체에 대해 Validation을 실시
  // class-transformer 사용을 위한 옵션 전달.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
