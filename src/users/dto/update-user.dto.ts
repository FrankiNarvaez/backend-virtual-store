import { ROLES } from '../../constants/roles.constants';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  password: string;
  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}
