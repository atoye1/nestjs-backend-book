import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'email/email.service';
import { UserInfo } from './users.interface';

@Injectable()
export class UsersService {
  // 생성자로 이메일 서비스를 주입받아서 사용한다.
  constructor(private emailService: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExist(email);
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

  private checkUserExist(email: string) {
    return false; // TODO: DB연동 후 구현
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; //TODO DB연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
