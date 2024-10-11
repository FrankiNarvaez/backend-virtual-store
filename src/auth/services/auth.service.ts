import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from '../../users/entities/users.entity';
import { AuthLogin, PayloadToken } from '../../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(credentials: AuthLogin) {
    const user = await this.userService.getUserByEmail(credentials.email);
    if (user) {
      const match = await bcrypt.compare(credentials.password, user.password);
      if (match) return user;
    }
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UsersEntity): Promise<any> {
    const getUser = await this.userService.getUserById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      access_token: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES,
      }),
      user,
    };
  }
}
