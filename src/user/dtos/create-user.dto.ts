// dtos/create-user.dto.ts
//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  // @MaxLength(20)
  // @MinLength(3)
  // @IsNotEmpty()
  // @IsString()
  // firstName: string;

  // @MaxLength(25)
  // @MinLength(3)
  // @IsNotEmpty()
  // @IsString()
  // lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @IsNotEmpty()
  // @IsPhoneNumber(null)
  // phone: string;

  // @Transform(({ value }) => (Array.isArray(value) ? value.join(' ') : ''))
  // @IsNotEmpty()
  // @IsString()
  // address: string;
}
