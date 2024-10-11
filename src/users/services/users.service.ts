import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ShoppingCartEntity } from '../../shopping-cart/entities/shopping-cart.entity';
import { ErrorManager } from '../../config/error.manager';
import { LoginUserDto } from '../dto/login-user.dto';

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
      throw ErrorManager.createError(error.message);
    }
  }

  public async getUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.usersRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async getUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.usersRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.usersRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.usersRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }

  public async loginUser(credentials: LoginUserDto) {
    try {
      const { email, password } = credentials;
      const user: UsersEntity = await this.usersRepository
        .createQueryBuilder('users')
        .where({ email, password })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createError(error.message);
    }
  }
}
