// src/shopping-carts/shopping-carts.controller.ts

import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCart } from './shopping-cart.entity';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post()
  async createShoppingCart(@Body() cartData: Partial<ShoppingCart>): Promise<ShoppingCart> {
    return this.shoppingCartsService.createShoppingCart(cartData.user.UserID); // Assuming UserID is provided in the request body for cart creation.
  }

  @Get()
  async getAllShoppingCarts(): Promise<ShoppingCart[]> {
    return this.shoppingCartsService.getAllShoppingCarts();
  }

  @Get(':id')
  async getShoppingCartById(@Param('id') cartID: number): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartsService.getShoppingCartById(cartID);
    if (!shoppingCart) {
      throw new NotFoundException('Shopping cart not found');
    }
    return shoppingCart;
  }

  @Patch(':id')
  async updateShoppingCart(@Param('id') cartID: number, @Body() cartData: Partial<ShoppingCart>): Promise<ShoppingCart> {
    return this.shoppingCartsService.updateShoppingCart(cartID, cartData);
  }

  @Delete(':id')
  async deleteShoppingCart(@Param('id') cartID: number): Promise<void> {
    return this.shoppingCartsService.deleteShoppingCart(cartID);
  }

  @Post(':id/add-product/:productId/:quantity')
  async addProductToCart(
    @Param('id') cartID: number,
    @Param('productId') productID: number,
    @Param('quantity') quantity: number,
  ): Promise<ShoppingCart> {
    return this.shoppingCartsService.addProductToCart(cartID, productID, quantity);
  }

  @Delete(':id/remove-product/:productId')
  async removeProductFromCart(
    @Param('id') cartID: number,
    @Param('productId') productID: number,
  ): Promise<ShoppingCart> {
    return this.shoppingCartsService.removeProductFromCart(cartID, productID);
  }

  @Get(':id/total-price')
  async getTotalPrice(@Param('id') cartID: number): Promise<number> {
    return this.shoppingCartsService.calculateTotalPrice(cartID);
  }
}
