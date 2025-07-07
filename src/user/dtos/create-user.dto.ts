// dtos/create-user.dto.ts
//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
