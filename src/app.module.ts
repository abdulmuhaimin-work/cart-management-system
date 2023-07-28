// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { ShoppingCart } from './shopping-carts/shopping-cart.entity';
import { CartItem } from './cart-items/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(), // Load environment variables from .env file if needed
    TypeOrmModule.forRoot({
      type: 'postgres', // Your database type
      host: process.env.DB_HOST || 'localhost', // Your database host (you can use environment variables for dynamic values)
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Your database port (you can use environment variables for dynamic values)
      username: process.env.DB_USERNAME || 'postgres', // Your database username (you can use environment variables for dynamic values)
      password: process.env.DB_PASSWORD || 'password', // Your database password (you can use environment variables for dynamic values)
      database: process.env.DB_NAME || 'CartMS', // Your database name (you can use environment variables for dynamic values)
      entities: [User, Product, Category, ShoppingCart, CartItem], // Array of entity classes to be used in the application
      synchronize: true, // Auto-create the database tables based on the entities (NOTE: Do NOT use this in production)
    }),
  ],
  controllers: [UsersController], // Make sure UsersController is included here
  providers: [UsersService],
})
export class AppModule {}
