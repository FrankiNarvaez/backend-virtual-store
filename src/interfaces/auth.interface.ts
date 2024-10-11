import { ROLES } from '../constants/roles.constants';

export interface PayloadToken {
  role: ROLES;
  sub: string;
}

