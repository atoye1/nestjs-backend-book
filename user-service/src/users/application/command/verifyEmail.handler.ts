import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';
import { VerifyEmailCommand } from './verifyEmail.command';

@Injectable()
@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async execute(command: VerifyEmailCommand): Promise<string> {
    const { signupVerifyToken } = command;
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken: signupVerifyToken },
    });
    if (!user) throw new NotFoundException('No Such User');

    user.emailVerified = true;
    await this.userRepository.save(user);
    // 2. 바로 로그인 상태가 되도록 JWT발급
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
