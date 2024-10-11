import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class ShoppingCartDto {
  @IsUUID()
  @IsNotEmpty()
  product_id: string;
  @IsNumber()
  @Min(1)
  quantity: number;
}
