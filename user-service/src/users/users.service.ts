import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'email/email.service';
import { UserInfo } from './users.interface';
import { Repository } from 'typeorm';
import { UserEntity } from './entitiy/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // 생성자로 이메일 서비스를 주입받아서 사용한다.
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExists = await this.checkUserExist(email);
    if (userExists)
      throw new UnprocessableEntityException(`${email} Already Exists!`);

    const signupVerifyToken = uuid.v1();
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 가입 처리중인 유저가 있는지 조회하고 없으면 에러처리
    // 2. 바로 로그인 상태가 되도록 JWT발급
    throw new Error('Method not implemented');
  }

  async login(email, password): Promise<string> {
    throw new Error('Method not implemented');
  }

  async getUserInfo(userId: number): Promise<UserInfo> {
    throw new Error('Method not implemented');
  }

  private async checkUserExist(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user !== undefined;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = uuid.v1();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    console.log(user);
    await this.userRepository.save(user);
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
