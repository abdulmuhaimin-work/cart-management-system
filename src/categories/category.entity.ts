// src/categories/category.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  // Additional properties for category, if any
  // ...

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
