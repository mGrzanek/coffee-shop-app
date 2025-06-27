import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class UpdateCartItemDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Min(1)
  @Max(10)
  @IsInt()
  @IsNotEmpty()
  productAmount: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  weightId: string;

  @IsOptional()
  optionalMessage: string;
}
