import { Injectable } from '@nestjs/common';
import { EmailService as ExternalEmailService } from 'email/email.service';
import { IEmailService } from 'users/application/adapter/iemail.service';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private emailService: ExternalEmailService) {}
  async sendMemberJoinVerification(
    email: any,
    signupVerifyToken: any,
  ): Promise<void> {
    this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
