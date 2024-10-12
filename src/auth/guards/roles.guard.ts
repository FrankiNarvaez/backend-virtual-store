import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from "../../constants/key-decorator";
import { ROLES } from "../../constants/roles.constants";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();

    const { role_user } = request;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && role_user === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'You do not have permission to access this resource',
        );
      }
    }

    const isAuth = roles.some((role) => role === role_user);

    if (!isAuth) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
