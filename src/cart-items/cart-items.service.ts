// src/cart-items/cart-items.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async createCartItem(cartItemData: Partial<CartItem>): Promise<CartItem> {
    const newCartItem = this.cartItemRepository.create(cartItemData);
    return this.cartItemRepository.save(newCartItem);
  }

  async getAllCartItems(): Promise<CartItem[]> {
    return this.cartItemRepository.find();
  }

  async getCartItemById(cartItemID: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { CartItemID: cartItemID } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    return cartItem;
  }

  async updateCartItem(cartItemID: number, cartItemData: Partial<CartItem>): Promise<CartItem> {
    const cartItem = await this.getCartItemById(cartItemID);
    this.cartItemRepository.merge(cartItem, cartItemData);
    return this.cartItemRepository.save(cartItem);
  }

  async deleteCartItem(cartItemID: number): Promise<void> {
    const cartItem = await this.getCartItemById(cartItemID);
    await this.cartItemRepository.remove(cartItem);
  }
}
