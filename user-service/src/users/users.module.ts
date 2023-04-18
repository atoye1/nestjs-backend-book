import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from 'email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitiy/user.entity';
import { AuthService } from 'auth/auth.service';
import { AuthGuard } from 'guards/auth.guard';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './command/createUser.handler';
import { VerifyEmailHandler } from './command/verifyEmail.handler';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity]), CqrsModule], // 유저 모듈 안에서만 사용할 것이므로 forFeature로 동적 모듈을 가져온다.
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    AuthGuard,
    Logger,
    CreateUserHandler,
    VerifyEmailHandler,
  ],
  // providers: [UsersService, EmailService], // EmailModule에서 export했으므로 EmailService는 여기선 추가할 필요없다.
})
export class UsersModule {}
