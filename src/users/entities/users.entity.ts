import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../../constants/roles.constants';
import { OrdersEntity } from '../../orders/entities/orders.entity';

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
  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];
}
