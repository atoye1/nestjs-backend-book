import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRepository } from 'users/infra/db/repository/UserRepository';
import { IUserRepository } from 'users/domain/repository/iuser.repository';
import { UserFactory } from 'users/domain/user.factory';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepository) private userRepository: IUserRepository,
    private dataSource: DataSource,
    private userFactory: UserFactory,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { email, name, password } = command;
    const user = await this.userRepository.findByEmail(email);
    if (user !== null) {
      throw new UnprocessableEntityException('Cannot Join with this Email');
    }
    const id = uuid.v1();
    const signupVerifyToken = ulid();
    this.userRepository.save(id, name, email, password, signupVerifyToken);
    this.userFactory.create(id, name, email, password, signupVerifyToken);
  }
}
