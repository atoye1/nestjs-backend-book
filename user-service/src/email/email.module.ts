import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  // Email Provider를 모듈 바깥에서 사용할 수 있게 명시해준다.
  // Email Module만 import한 모듈에서도 Email Service를 사용할 수 있다.
  exports: [EmailService],
})
export class EmailModule {}
