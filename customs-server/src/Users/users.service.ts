import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(options: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}