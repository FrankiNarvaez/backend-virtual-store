import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLogin {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
