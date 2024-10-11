import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../../constants/roles.constants';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.USER,
  })
  role: ROLES;
}
