// dtos/create-user.dto.ts
import { Transform } from 'class-transformer';
import {
  IsString,
  IsPhoneNumber,
  IsNotEmpty,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  phone: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.join(' ') : ''))
  @IsNotEmpty()
  @IsString()
  address: string;
}
