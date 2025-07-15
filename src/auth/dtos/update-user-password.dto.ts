import { IsString, Length, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/utils/match.decorator';

export class UpdateUserPassword {
  @IsString()
  @IsNotEmpty()
  password: string;

  @Matches(/^[A-Za-z0-9!@#$%^&*_+-?]{10,}$/)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  @Match('newPassword')
  newPasswordRepeat: string;
}
