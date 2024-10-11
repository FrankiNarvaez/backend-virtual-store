import { ROLES } from '../constants/roles.constants';

export interface PayloadToken {
  role: ROLES;
  sub: string;
}

export interface AuthLogin {
  email: string;
  password: string;
}
