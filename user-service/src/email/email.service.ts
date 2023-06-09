import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import emailConfig from 'config/emailConfig';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;
  // 생성자에서 transporter 객체를 만들어, 이후의 메서드에서 활용한다.
  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.config.service,
      auth: {
        user: this.config.auth.user,
        pass: this.config.auth.pass,
      },
    });
  }

  // mailOptions 객체를 생성하고, transporter를 활용해
  // 메일을 보내는 역할을 수행하는 메서드.
  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    console.log({ signupVerifyToken });
    const baseUrl = this.config.baseUrl;
    const url =
      baseUrl + `/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    const mailOptions: EmailOptions = {
      // 네이버의 경우 from을 실제 주소와 동일하게 하지 않으면 인증 오류 발생.
      from: this.config.from,
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
