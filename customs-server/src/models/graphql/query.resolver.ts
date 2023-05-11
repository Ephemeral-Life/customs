import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../users/entities/User';

@Resolver()
export class QueryResolver {
  constructor(private readonly prisma: PrismaService) {} // 注入Prisma服务类

  @Query(() => [User]) // 声明该resolver函数返回类型为User数组
  async user(): Promise<User[]> {
    return this.prisma.user.findMany(); // 使用Prisma服务类中的findMany()函数获取所有用户数据
  }
}
