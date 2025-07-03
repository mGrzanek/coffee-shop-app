import {
  IsString,
  Matches,
  IsNotEmpty,
  MinLength,
  Min,
  IsEmail,
  MaxLength,
  ValidateNested,
  IsArray,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { OrderedProductDTO } from './create-product-order.dto';
import { Transform, Type } from 'class-transformer';

export class CreateOrderDTO {
  @Matches(/^[A-ZŻŹĆĄŚĘŁÓŃa-zżźćńółęąś]{3,20}$/)
  @MaxLength(20)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @Matches(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]{3,30}$/)
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  clientSurname: string;

  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @Matches(/^\d{9,16}$/)
  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.join(' ');
    }
    return value;
  })
  @IsNotEmpty()
  @IsString()
  clientAddress: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderedProductDTO)
  orderedProducts: OrderedProductDTO[];

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  productsPrice: number;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsUUID()
  @IsNotEmpty()
  deliveryId: string;
}
