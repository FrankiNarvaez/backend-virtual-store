import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/services/users.service';
import { PUBLIC_KEY } from '../../constants/key-decorator';
import { Request } from 'express';
import { useToken } from '../../utils/use.token';
import { UseToken } from '../../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['access_token'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Iinvalid token');
    }

    const manageToken: UseToken | string = useToken(token);
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    const { sub } = manageToken;
    const user = await this.userService.getUserById(sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user_id = user.id;
    request.role_user = user.role;
    return true;
  }
}
