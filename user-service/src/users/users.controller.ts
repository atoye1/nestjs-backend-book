import {
  Get,
  Query,
  Param,
  Req,
  Body,
  Post,
  Controller,
  UseGuards,
  Inject,
  LoggerService,
  InternalServerErrorException,
  Logger,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { VerifyEmailDto } from './dto/VerifyEmailDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UsersService } from './users.service';
import { AuthService } from 'auth/auth.service';
import { UserInfo } from './Userinfo';
import { AuthGuard } from 'guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get('/error')
  throwError(): void {
    throw new HttpException('my custom http exception(400)', 400);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<any> {
    this.printLoggerServiceLog(dto);
    const { name, email, password } = dto;
    return this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<any> {
    const { signupVerifyToken } = dto;
    console.log(dto);
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<any> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  // param을 파싱하는 컨트롤러 배치순서 주의해야 한다.

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(
    @Req() req: any,
    // @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    // const jwtString = headers.authorization.split('Bearer ')[1];
    // 아래서 헤더로 받은 jwt 토큰을 밸리데이션한다.
    // Guard 데커레이터로 더 좋은 디자인 패턴으로 개선해야한다.
    // this.authService.verify(jwtString);
    // 여기서 userId를 파싱할 수 있긴하지만, Restful하게 설계하기 위해 파라미터로 받은 값만 사용한다.
    const { authUserId } = req;
    console.log({ authUserId });
    return await this.usersService.getUserInfo(userId);
  }

  private printLoggerServiceLog(dto: CreateUserDto) {
    // 내장로거는 객체를 메시지로 자동변환해주지 않으므로 JSON.stringify(dto) 해줘야한다.
    try {
      throw new InternalServerErrorException('for test');
    } catch (e) {
      // 에러 로그는 stack을 출력해주면 디버깅에 좋다
      this.logger.error(JSON.stringify(dto), e.stack);
    }
    this.logger.verbose('verbose: ', JSON.stringify(dto));
    this.logger.debug('debug: ', JSON.stringify(dto));
  }
}
