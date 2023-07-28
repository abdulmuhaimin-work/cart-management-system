// src/cart-items/cart-item.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ShoppingCart } from '../shopping-carts/shopping-cart.entity';
import { Product } from '../products/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  CartItemID: number;

  @Column()
  Quantity: number;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.cartItems)
  @JoinColumn({ name: 'CartID' })
  shoppingCart: ShoppingCart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'ProductID' })
  product: Product;
}
