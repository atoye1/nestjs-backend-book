import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { EmailService } from 'email/email.service';
import { UserInfo } from './Userinfo';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class UsersService {
  // 생성자로 이메일 서비스를 주입받아서 사용한다.
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('no such user');
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
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

  private async saveUserUsingTransaction(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await manager.save(user);
    });
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
