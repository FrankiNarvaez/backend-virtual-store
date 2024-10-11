import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateShoppingCartDto {
  @IsOptional()
  @IsUUID()
  product_id: string;
  @IsOptional()
  @IsNumber()
  quantity: number;
}
