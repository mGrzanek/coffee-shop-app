import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderDTO {
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
