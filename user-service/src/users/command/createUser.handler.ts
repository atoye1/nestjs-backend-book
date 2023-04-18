import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUser.command';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { EmailService } from 'email/email.service';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';
import { UserCreatedEvent } from 'users/event/userCreated.event';
import { TestEvent } from 'users/event/test.event';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { email, name, password } = command;
    const userExists = await this.checkUserExist(email);
    if (userExists)
      throw new UnprocessableEntityException(`${email} Already Exists!`);

    const signupVerifyToken = ulid();
    const saveResult = await this.saveUserUsingQueryRunner(
      name,
      email,
      password,
      signupVerifyToken,
    );
    if (saveResult) await this.sendMemberJoinEmail(email, signupVerifyToken);

    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));
    this.eventBus.publish(new TestEvent());
  }

  private async checkUserExist(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user);
  }

  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.id = uuid.v1();
      user.name = name;
      user.password = password;
      user.email = email;
      user.signupVerifyToken = signupVerifyToken;
      user.emailVerified = false;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log('query runner error');
      console.error(error);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
