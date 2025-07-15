import { Transform } from 'class-transformer';
import {
  IsString,
  Matches,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UpdateUserDataDto {
  @Matches(/^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,20}$/)
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]{3,30}$/)
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Matches(/^\d{9,16}$/)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.join(' ');
    }
    return value;
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
