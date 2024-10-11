import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ShoppingCartEntity } from '../../shopping-cart/entities/shopping-cart.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(ShoppingCartEntity)
    private readonly shoppingCartRepository: Repository<ShoppingCartEntity>,
  ) {}

  public async createUser(body: UserDto): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.usersRepository.save(body);
      const shoppingCart = new ShoppingCartEntity();
      shoppingCart.user = user;
      await this.shoppingCartRepository.save(shoppingCart);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async getUsers(): Promise<UsersEntity[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }
  public async getUserById(id: string): Promise<UsersEntity> {
    try {
      return await this.usersRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }
  public async updateUser(
    id: string,
    body: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.usersRepository.update(id, body);
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.usersRepository.delete(id);
      if (user.affected === 0) {
        return undefined;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
