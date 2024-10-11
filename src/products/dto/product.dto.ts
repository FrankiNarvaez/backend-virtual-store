import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
  @IsNotEmpty()
  @IsString()
  image: string;
}
