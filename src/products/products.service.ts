// src/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(productData);
    return this.productRepository.save(newProduct);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(productID: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { ProductID: productID } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(productID: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.getProductById(productID);
    this.productRepository.merge(product, productData);
    return this.productRepository.save(product);
  }

  async deleteProduct(productID: number): Promise<void> {
    const product = await this.getProductById(productID);
    await this.productRepository.remove(product);
  }
}
