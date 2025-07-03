import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  Max,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class OrderedProductDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Min(1)
  @Max(10)
  @IsInt()
  @IsNotEmpty()
  productAmount: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  productSinglePrice: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  weightId: string;

  @IsString()
  @IsOptional()
  optionalMessage?: string;
}
