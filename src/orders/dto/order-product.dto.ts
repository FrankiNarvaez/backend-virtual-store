import { IsNotEmpty, IsUUID } from 'class-validator';

export class OrderProductDto {
  @IsUUID()
  @IsNotEmpty()
  order_id: string;
  @IsUUID()
  @IsNotEmpty()
  product_id: string;
}
