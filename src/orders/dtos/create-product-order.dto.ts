// ProductOrderDTO.ts
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

export class ProductOrderDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  productName: string;

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

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  productWeight: number;

  @IsString()
  @IsOptional()
  optionalMessage?: string;
}
