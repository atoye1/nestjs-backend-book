import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqr';

import { AuthGuard } from 'guards/auth.guard';
import { EmailModule } from 'email/email.module';
import { AuthService } from 'auth/auth.service';
import { CreateUserHandler } from './application/command/createUser.handler';
import { VerifyEmailHandler } from './application/command/verifyEmail.handler';
import { LoginHandler } from './application/command/login.handler';
import { GetUserInfoHandler } from './application/query/getUserInfo.handler';
import { UsersController } from './interface/users.controller';
import { UserEntity } from './infra/db/entity/user.entity';
import { UserEventHandler } from './application/event/usersEvents.handler';
import { UserRepository } from './infra/db/repository/UserRepository';
import { EmailService } from './infra/adapter/email.service';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([UserEntity]), CqrsModule], // 유저 모듈 안에서만 사용할 것이므로 forFeature로 동적 모듈을 가져온다.
  controllers: [UsersController],
  providers: [
    AuthService,
    AuthGuard,
    Logger,
    CreateUserHandler,
    LoginHandler,
    VerifyEmailHandler,
    UserEventHandler,
    GetUserInfoHandler,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'EmailService',
      useClass: EmailService,
    },
  ],
  // providers: [UsersService, EmailService], // EmailModule에서 export했으므로 EmailService는 여기선 추가할 필요없다.
})
export class UsersModule {}
