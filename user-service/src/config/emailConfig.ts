import { registerAs } from '@nestjs/config';

// email이라는 키로 ConfigFactory를 등록하는 코드
export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
  from: process.env.EMAIL_FROM_ADDR,
}));
