import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cartId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
