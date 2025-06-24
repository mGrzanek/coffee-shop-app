import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cartId: string;
}
