import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly prodcutsService: ProductsService) {}

  @Roles('ADMIN')
  @Post('create')
  public async createProduct(@Body() body: ProductDto) {
    return this.prodcutsService.createProduct(body);
  }

  @Get('get-products')
  public async getProducts() {
    return this.prodcutsService.getProducts();
  }

  @Get(':id')
  public async getProductById(@Param('id') id: string) {
    return this.prodcutsService.getProductById(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.prodcutsService.updateProduct(id, body);
  }

  @Roles('ADMIN')
  @Delete(':id')
  public async deleteProduct(@Param('id') id: string) {
    return this.prodcutsService.deleteProduct(id);
  }
}
