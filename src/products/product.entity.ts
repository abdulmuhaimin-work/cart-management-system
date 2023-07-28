// src/products/product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/category.entity';
import { CartItem } from '../cart-items/cart-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  // Additional properties for product, e.g., StockQuantity, ImageURL, etc.
  // ...

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => CartItem, (cartItem) => cartItem.product)
  @JoinTable()
  cartItems: CartItem[];
}
