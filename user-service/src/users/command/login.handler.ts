import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';

@Injectable()
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    const { email, password } = command;
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!user) throw new NotFoundException('No such user');

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
