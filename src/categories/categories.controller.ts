// src/categories/categories.controller.ts

import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoriesService.createCategory(categoryData);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') categoryID: number): Promise<Category> {
    const category = await this.categoriesService.getCategoryById(categoryID);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Patch(':id')
  async updateCategory(@Param('id') categoryID: number, @Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoriesService.updateCategory(categoryID, categoryData);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') categoryID: number): Promise<void> {
    return this.categoriesService.deleteCategory(categoryID);
  }
}
