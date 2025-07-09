import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  Matches,
} from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(/^[A-Za-z0-9!@#$%^&*_+-?]{10,}$/)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  @Match('password')
  passwordRepeat: string;
}
