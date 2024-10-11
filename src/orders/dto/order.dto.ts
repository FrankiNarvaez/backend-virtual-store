import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  total: number;
  @IsNotEmpty()
  @IsDate()
  bought_at: Date;
}
