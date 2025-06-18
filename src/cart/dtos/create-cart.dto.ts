import { IsOptional, IsUUID } from 'class-validator';

export class CreateCartDTO {
  @IsOptional()
  @IsUUID()
  userId: string;
}
