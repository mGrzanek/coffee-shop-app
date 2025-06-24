// dtos/create-user.dto.ts
import { Transform } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsPhoneNumber,
  IsNotEmpty,
  MinLength,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cartId: string;

  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @MaxLength(25)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @MinLength(3)
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
