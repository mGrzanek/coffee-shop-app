import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateCartDto {
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  totalCartPrice: number;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsUUID()
  orderId: string;
}
