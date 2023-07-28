// src/shopping-carts/shopping-carts.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './shopping-cart.entity';
import { CartItem } from '../cart-items/cart-item.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product) // Add this line to inject the Product repository
    private productRepository: Repository<Product>,
  ) {}

  async createShoppingCart(userID: number): Promise<ShoppingCart> {
    const shoppingCart = this.shoppingCartRepository.create({ user: { UserID: userID } });
    return this.shoppingCartRepository.save(shoppingCart);
  }

  async getAllShoppingCarts(): Promise<ShoppingCart[]> {
    return this.shoppingCartRepository.find({ relations: ['cartItems'] });
  }

  async getShoppingCartById(cartID: number): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartRepository.findOne(
      { where: { CartID: cartID }, relations: ['cartItems'] },
    );
    if (!shoppingCart) {
      throw new NotFoundException('Shopping cart not found');
    }
    return shoppingCart;
  }

  async updateShoppingCart(cartID: number, cartData: Partial<ShoppingCart>): Promise<ShoppingCart> {
    const shoppingCart = await this.getShoppingCartById(cartID);
    this.shoppingCartRepository.merge(shoppingCart, cartData);
    return this.shoppingCartRepository.save(shoppingCart);
  }

  async deleteShoppingCart(cartID: number): Promise<void> {
    const shoppingCart = await this.getShoppingCartById(cartID);
    await this.shoppingCartRepository.remove(shoppingCart);
  }

  async addProductToCart(cartID: number, productID: number, quantity: number): Promise<ShoppingCart> {
    const shoppingCart = await this.getShoppingCartById(cartID);
    const productCartItem = shoppingCart.cartItems.find((item) => item.product.ProductID === productID);

    if (productCartItem) {
      productCartItem.Quantity += quantity;
    } else {
      const product = new CartItem();
      product.product = { ProductID: productID } as any; // Use as any to bypass TypeScript strict checking
      product.Quantity = quantity;
      shoppingCart.cartItems.push(product);
    }

    return this.shoppingCartRepository.save(shoppingCart);
  }

  async removeProductFromCart(cartID: number, productID: number): Promise<ShoppingCart> {
    const shoppingCart = await this.getShoppingCartById(cartID);
    shoppingCart.cartItems = shoppingCart.cartItems.filter((item) => item.product.ProductID !== productID);

    return this.shoppingCartRepository.save(shoppingCart);
  }

  async calculateTotalPrice(cartID: number): Promise<number> {
    const shoppingCart = await this.getShoppingCartById(cartID);
    let totalPrice = 0;

    for (const cartItem of shoppingCart.cartItems) {
      const product = await this.productRepository.findOne({ where:{ ProductID: cartItem.product.ProductID}});
      if (product) {
        totalPrice += product.Price * cartItem.Quantity;
      }
    }

    return totalPrice;
  }
}
