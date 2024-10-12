import { ROLES } from '../constants/roles.constants';
import { UsersEntity } from '../users/entities/users.entity';

export interface PayloadToken {
  role: ROLES;
  sub: string;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface UseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: UsersEntity;
}
