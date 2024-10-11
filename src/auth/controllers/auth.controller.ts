import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from '../services/auth.service';
import { AuthLogin } from '../../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: AuthLogin) {
    const user = await this.authService.validateUser(credentials);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return await this.authService.generateJWT(user);
  }
}
