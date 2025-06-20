import { IsNotEmpty, IsNumber, Min, IsUUID, IsOptional } from 'class-validator';

export class UpdateCartDto {
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  totalCartPrice: number;

  @IsOptional()
  @IsUUID()
  userId: string;
}
