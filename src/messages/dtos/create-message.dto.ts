import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateMessageDto {
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(3)
  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  message: string;
}
