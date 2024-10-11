import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

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
      return await this.productsRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getProductById(id: string): Promise<ProductsEntity> {
    try {
      return await this.productsRepository
        .createQueryBuilder('products')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateProduct(
    id: string,
    body: UpdateProductDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const product: UpdateResult = await this.productsRepository.update(
        id,
        body,
      );
      if (product.affected === 0) {
        return undefined;
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteProduct(id: string): Promise<DeleteResult | undefined> {
    try {
      const product: DeleteResult = await this.productsRepository.delete(id);
      if (product.affected === 0) {
        return undefined;
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
}
