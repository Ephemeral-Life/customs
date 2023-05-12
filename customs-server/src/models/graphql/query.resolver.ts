import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../users/entities/User';
import { UsersService } from '../users/users.service';

@Resolver()
export class QueryResolver {
  private readonly prisma: PrismaService
  private readonly usersService: UsersService;
  constructor(prisma: PrismaService, usersService: UsersService) {
    this.prisma = prisma;
    this.usersService = usersService;
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  @Query(() => User)
  async getUserByUsernameAndPassword(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        username,
        password
      },
    });
  }
}