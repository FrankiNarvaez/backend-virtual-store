import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ErrorManager } from "../../config/error.manager";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  public async createProduct(body: ProductDto): Promise<ProductsEntity> {
    try {
      return await this.productsRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getProducts(): Promise<ProductsEntity[]> {
    try {
      const products: ProductsEntity[] = await this.productsRepository.find();
      if (products.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Products not found',
        });
      }
      return products;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async getProductById(id: string): Promise<ProductsEntity> {
    try {
      const product: ProductsEntity = await this.productsRepository
        .createQueryBuilder('products')
        .where({ id })
        .getOne();
      if (!product) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Product not found',
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async updateProduct(
    id: string,
    body: UpdateProductDto,
  ): Promise<UpdateResult> {
    try {
      const product: UpdateResult = await this.productsRepository.update(
        id,
        body,
      );
      if (product.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Product not found',
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async deleteProduct(id: string): Promise<DeleteResult> {
    try {
      const product: DeleteResult = await this.productsRepository.delete(id);
      if (product.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Product not found',
        });
      }
      return product;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
