// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShoppingCart } from '../shopping-carts/shopping-cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ unique: true })
  Username: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  // Additional properties for user, e.g., FirstName, LastName, etc.
  // ...

  @OneToMany(() => ShoppingCart, (cart) => cart.user)
  shoppingCarts: ShoppingCart[];
}
