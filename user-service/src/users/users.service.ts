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

  async createUser(name: string, email: string, password: string) {
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
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 가입 처리중인 유저가 있는지 조회하고 없으면 에러처리
    console.log('in users.service.ts');
    console.log({ signupVerifyToken });
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken: signupVerifyToken },
    });
    if (!user) throw new NotFoundException('No Such User');
    console.log(user);
    user.emailVerified = true;
    await this.userRepository.save(user);
    // 2. 바로 로그인 상태가 되도록 JWT발급
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(email: string, password: string): Promise<string> {
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
