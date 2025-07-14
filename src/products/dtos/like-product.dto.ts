import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class LikeProductDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
