// src/categories/categories.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(newCategory);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(categoryID: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { CategoryID: categoryID } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(categoryID: number, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.getCategoryById(categoryID);
    this.categoryRepository.merge(category, categoryData);
    return this.categoryRepository.save(category);
  }

  async deleteCategory(categoryID: number): Promise<void> {
    const category = await this.getCategoryById(categoryID);
    await this.categoryRepository.remove(category);
  }
}
