// create-order.dto.ts
import { IsArray } from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  products: { product_id: string; quantity: number }[];
}
