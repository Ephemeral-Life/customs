import { Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });
  }
}
