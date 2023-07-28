// src/cart-items/cart-items.controller.ts

import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItem } from './cart-item.entity';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  async createCartItem(@Body() cartItemData: Partial<CartItem>): Promise<CartItem> {
    return this.cartItemsService.createCartItem(cartItemData);
  }

  @Get()
  async getAllCartItems(): Promise<CartItem[]> {
    return this.cartItemsService.getAllCartItems();
  }

  @Get(':id')
  async getCartItemById(@Param('id') cartItemID: number): Promise<CartItem> {
    const cartItem = await this.cartItemsService.getCartItemById(cartItemID);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    return cartItem;
  }

  @Patch(':id')
  async updateCartItem(
    @Param('id') cartItemID: number,
    @Body() cartItemData: Partial<CartItem>,
  ): Promise<CartItem> {
    return this.cartItemsService.updateCartItem(cartItemID, cartItemData);
  }

  @Delete(':id')
  async deleteCartItem(@Param('id') cartItemID: number): Promise<void> {
    return this.cartItemsService.deleteCartItem(cartItemID);
  }
}
