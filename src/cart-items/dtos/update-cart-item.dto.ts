import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsInt,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Weight } from 'enums/weight.enum';

export class UpdateCartItemDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  productAmount: number;

  @IsEnum(Weight)
  weight: Weight;

  @IsOptional()
  optionalMessage: string;
}
