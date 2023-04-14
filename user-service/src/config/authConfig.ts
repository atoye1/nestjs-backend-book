import { registerAs } from '@nestjs/config';

// auth라는 키로 ConfigFactory를 등록하는 코드
export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
