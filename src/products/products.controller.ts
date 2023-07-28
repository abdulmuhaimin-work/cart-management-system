// src/products/products.controller.ts

import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.createProduct(productData);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') productID: number): Promise<Product> {
    const product = await this.productsService.getProductById(productID);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Patch(':id')
  async updateProduct(@Param('id') productID: number, @Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.updateProduct(productID, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productID: number): Promise<void> {
    return this.productsService.deleteProduct(productID);
  }
}
