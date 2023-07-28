import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(userID: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { UserID: userID } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userID: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUserById(userID);
    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }

  async deleteUser(userID: number): Promise<void> {
    const user = await this.getUserById(userID);
    await this.userRepository.remove(user);
  }
}
