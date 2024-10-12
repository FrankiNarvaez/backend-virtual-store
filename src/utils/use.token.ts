import { AuthTokenResult, UseToken } from '../interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): UseToken | string => {
  try {
    const decoded = jwt.decode(token) as AuthTokenResult;

    const currentDate = new Date();
    const expiresDate = new Date(decoded.exp * 1000);

    return {
      sub: decoded.sub,
      role: decoded.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return 'Token is not valid';
  }
};
