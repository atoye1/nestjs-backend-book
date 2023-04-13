import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  maxLength,
  minLength,
} from 'class-validator';
import { NotIn } from 'utils/decorators/not-in';
export class CreateUserDto {
  @Transform(({ obj, value }) => {
    // params를 받아서 출력만하고 그대로 돌려주는 데커레이터
    // console.log(params);
    // return params.value.trim();

    // console.log('params obj (DTO) : ', params.obj);
    // Transfrom에서는 dto에 접근 가능해서 dto의 속성간에 비교하는 로직도 구현 가능함.
    // if (obj.password.includes(obj.name.trim())) {
    //   throw new BadRequestException(
    //     'password should not contain same string with name',
    //   );
    // }
    return value.trim();
  })
  @NotIn('password', { message: 'password should not contain name' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
