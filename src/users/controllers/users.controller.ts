import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return await this.usersService.createUser(body);
  }

  @Get('get-users')
  public async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
