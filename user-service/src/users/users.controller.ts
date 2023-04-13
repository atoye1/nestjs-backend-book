import {
  Get,
  Query,
  Param,
  Body,
  Post,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { VerifyEmailDto } from './dto/VerifyEmailDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<any> {
    const { name, email, password } = dto;
    return this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<any> {
    const { singnupVerifyToken } = dto;
    return this.usersService.verifyEmail(singnupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<any> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return await this.usersService.getUserInfo(userId);
  }
}
