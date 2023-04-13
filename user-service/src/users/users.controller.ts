import { Get, Query, Param, Body, Post, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { VerifyEmailDto } from './dto/VerifyEmailDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<any> {
    const { name, email, password } = dto;
    return this.service.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<any> {
    console.log(dto);
    return dto;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<any> {
    console.log(dto);
    return dto;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<any> {
    console.log(userId);
    return userId;
  }
}
