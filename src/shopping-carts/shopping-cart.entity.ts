// src/shopping-carts/shopping-cart.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { CartItem } from '../cart-items/cart-item.entity';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  CartID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.shoppingCart, { eager: true, cascade: true })
  cartItems: CartItem[];

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  @JoinColumn({ name: 'UserID' })
  user: User;
}
